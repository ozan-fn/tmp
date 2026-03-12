"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import Link from "next/link";

export function PostTable() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            if (!res.ok) throw new Error("Failed to fetch posts");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            toast.error("Gagal mengambil daftar post");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus post ini?")) return;

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete post");

            toast.success("Post berhasil dihapus");
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            toast.error("Gagal menghapus post");
        }
    };

    if (loading)
        return (
            <div className="flex justify-center p-10">
                <Loader2 className="animate-spin" />
            </div>
        );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Post Management</h1>
                <Button asChild>
                    <Link href="/dashboard/posts/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Buat Post Baru
                    </Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">No</TableHead>
                        <TableHead>Thumbnail</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Dibuat Pada</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                Belum ada post.
                            </TableCell>
                        </TableRow>
                    ) : (
                        posts.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{post.thumbnail ? <img src={post.thumbnail} className="w-12 h-12 object-cover rounded-md" alt="" /> : <div className="w-12 h-12 bg-muted rounded-md" />}</TableCell>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>{post.slug}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {post.postTags?.map((pt: any) => (
                                            <span key={pt.tag.id} className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-full">
                                                {pt.tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/dashboard/posts/${post.id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
