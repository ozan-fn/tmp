'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Loader2, Globe, FileText } from 'lucide-react';
import Link from 'next/link';

export function PostTable() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            if (!res.ok) throw new Error('Failed to fetch posts');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            toast.error('Gagal mengambil daftar post');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus post ini?')) return;

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete post');

            toast.success('Post berhasil dihapus');
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            toast.error('Gagal menghapus post');
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        setTogglingId(id);

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error('Failed to update status');

            setPosts(posts.map((post) => (post.id === id ? { ...post, status: newStatus } : post)));

            toast.success(newStatus === 'published' ? 'Post berhasil dipublikasikan' : 'Post dikembalikan ke draft');
        } catch (error) {
            toast.error('Gagal mengubah status post');
        } finally {
            setTogglingId(null);
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
                        <TableHead
                            className="w
-12"
                        >
                            No
                        </TableHead>
                        <TableHead>Thumbnail</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Dibuat Pada</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center text-muted-foreground">
                                Belum ada post.
                            </TableCell>
                        </TableRow>
                    ) : (
                        posts.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{post.thumbnail ? <img src={post.thumbnail} className="w-12 h-12 object-cover rounded-md" alt="" /> : <div className="w-12 h-12 bg-muted rounded-md" />}</TableCell>
                                <TableCell className="font-medium max-w-48 truncate">{post.title}</TableCell>
                                <TableCell className="text-muted-foreground text-sm max-w-32 truncate">{post.slug}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {post.postTags?.map((pt: any) => (
                                            <span key={pt.tag.id} className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-full">
                                                {pt.tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <button onClick={() => handleToggleStatus(post.id, post.status)} disabled={togglingId === post.id} className="focus:outline-none">
                                        {togglingId === post.id ? (
                                            <Badge variant="outline" className="gap-1 cursor-wait">
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                ...
                                            </Badge>
                                        ) : post.status === 'published' ? (
                                            <Badge className="gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-900/50 cursor-pointer transition-colors">
                                                <Globe className="h-3 w-3" />
                                                Published
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="gap-1 text-zinc-500 dark:text-zinc-400 hover:bg-muted cursor-pointer transition-colors">
                                                <FileText className="h-3 w-3" />
                                                Draft
                                            </Badge>
                                        )}
                                    </button>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {new Date(post.createdAt).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </TableCell>
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
