"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteLink } from "./actions";
import { toast } from "sonner";
import { LinkForm } from "./link-form";
import { Pencil, Trash2, Copy } from "lucide-react";

interface LinkTableProps {
    links: any[];
}

export function LinkTable({ links }: LinkTableProps) {
    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus link ini?")) {
            try {
                await deleteLink(id);
                toast.success("Link berhasil dihapus");
            } catch (error: any) {
                toast.error(error.message || "Gagal menghapus link");
            }
        }
    };

    const copyToClipboard = (shortlink: string) => {
        const domain = window.location.origin;
        const fullUrl = `${domain}/${shortlink}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success("Link berhasil disalin!");
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead>Nama Internal</TableHead>
                    <TableHead>Nama Tampilan</TableHead>
                    <TableHead>Shortlink</TableHead>
                    <TableHead>Link Ads</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {links.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                            Belum ada link.
                        </TableCell>
                    </TableRow>
                ) : (
                    links.map((link, index) => (
                        <TableRow key={link.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{link.nama}</TableCell>
                            <TableCell>{link.customNama || "-"}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 group">
                                    <span>{link.shortlink}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(link.shortlink)}>
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">{link.linkads}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <LinkForm
                                        initialData={link}
                                        trigger={
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
