"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { X, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const MarkdownEditor = dynamic(() => import("@/components/markdown-editor"), {
    ssr: false,
    loading: () => <div className="h-125 w-full bg-muted animate-pulse rounded-md flex items-center justify-center text-muted-foreground">Loading Editor...</div>,
});

interface PostFormProps {
    postId?: string;
}

export default function PostForm({ postId }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!postId);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [content, setContent] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        if (postId) {
            fetchPost();
        }
    }, [postId]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/posts/${postId}`);
            if (!res.ok) throw new Error("Failed to fetch post");
            const data = await res.json();
            setTitle(data.title);
            setSlug(data.slug);
            setThumbnail(data.thumbnail || "");
            setContent(data.content);
            setTags(data.postTags.map((pt: any) => pt.tag.name));
        } catch (error) {
            toast.error("Gagal mengambil data post");
            router.push("/dashboard/posts");
        } finally {
            setFetching(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);
        if (!postId) {
            setSlug(
                val
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, ""),
            );
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            const tag = tagInput.trim();
            if (tag && !tags.includes(tag)) {
                setTags([...tags, tag]);
            }
            setTagInput("");
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            setThumbnail(data.url);
        } else {
            toast.error("Gagal mengupload thumbnail");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title,
            slug,
            thumbnail,
            content,
            tags,
        };

        try {
            const url = postId ? `/api/posts/${postId}` : "/api/posts";
            const method = postId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save post");
            }

            toast.success(postId ? "Post berhasil diperbarui" : "Post berhasil dibuat");
            router.push("/dashboard/posts");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching)
        return (
            <div className="flex justify-center p-10">
                <Loader2 className="animate-spin" />
            </div>
        );

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/posts">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">{postId ? "Edit Post" : "Buat Post Baru"}</h1>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul</Label>
                                <Input id="title" value={title} onChange={handleTitleChange} required placeholder="Judul postingan" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="url-postingan" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="thumbnail">Thumbnail</Label>
                            <div className="flex items-center gap-4">
                                <Input id="thumbnail" type="file" accept="image/*" onChange={handleThumbnailUpload} className="max-w-xs" />
                                {thumbnail && (
                                    <div className="relative w-20 h-20 border rounded-md overflow-hidden bg-muted">
                                        <img src={thumbnail} alt="Thumbnail preview" className="object-cover w-full h-full" />
                                        <button type="button" onClick={() => setThumbnail("")} className="absolute top-0 right-0 bg-destructive text-white p-0.5 rounded-bl-md">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (Tekan spasi untuk menambah)</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map((tag, i) => (
                                    <Badge key={i} variant="secondary" className="flex items-center gap-1 pr-1">
                                        {tag}
                                        <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeTag(i)} />
                                    </Badge>
                                ))}
                            </div>
                            <Input id="tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Tambah tag..." />
                        </div>

                        <div className="space-y-2">
                            <Label>Konten</Label>
                            <MarkdownEditor value={content} onChange={setContent} />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {postId ? "Update Post" : "Simpan Post"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
