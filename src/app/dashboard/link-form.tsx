"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLink, updateLink } from "./actions";
import { toast } from "sonner";

interface LinkFormProps {
    initialData?: {
        id: string;
        nama: string;
        customNama?: string | null;
        shortlink: string;
        linkads: string;
    };
    trigger?: React.ReactNode;
    onSuccess?: () => void;
}

export function LinkForm({ initialData, trigger, onSuccess }: LinkFormProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nama: initialData?.nama || "",
        customNama: initialData?.customNama || "",
        shortlink: initialData?.shortlink || "",
        linkads: initialData?.linkads || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (initialData?.id) {
                await updateLink(initialData.id, formData);
                toast.success("Link berhasil diperbarui");
            } else {
                await createLink(formData);
                toast.success("Link berhasil ditambahkan");
            }
            setOpen(false);
            onSuccess?.();
            if (!initialData) {
                setFormData({ nama: "", customNama: "", shortlink: "", linkads: "" });
            }
        } catch (error: any) {
            toast.error(error.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger || <Button>{initialData ? "Edit" : "Tambah Link"}</Button>}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Link" : "Tambah Link Baru"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nama">Nama (Internal)</Label>
                        <Input id="nama" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customNama">Nama Kustom (Tampilan)</Label>
                        <Input id="customNama" value={formData.customNama} onChange={(e) => setFormData({ ...formData, customNama: e.target.value })} placeholder="Masukkan nama untuk tampilan chat" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shortlink">Shortlink</Label>
                        <Input id="shortlink" value={formData.shortlink} onChange={(e) => setFormData({ ...formData, shortlink: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkads">Link Ads</Label>
                        <Input id="linkads" value={formData.linkads} onChange={(e) => setFormData({ ...formData, linkads: e.target.value })} required />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
