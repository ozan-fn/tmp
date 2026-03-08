"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function getSession() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

export async function createLink(data: { nama: string; customNama?: string; shortlink: string; linkads: string; adScript?: string }) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const link = await prisma.link.create({
        data,
    });

    revalidatePath("/dashboard");
    return link;
}

export async function updateLink(id: string, data: { nama: string; customNama?: string; shortlink: string; linkads: string; adScript?: string }) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const link = await prisma.link.update({
        where: { id },
        data,
    });

    revalidatePath("/dashboard");
    return link;
}

export async function deleteLink(id: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.link.delete({
        where: { id },
    });

    revalidatePath("/dashboard");
}

export async function getLinks() {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    return await prisma.link.findMany({
        orderBy: { createdAt: "desc" },
    });
}
