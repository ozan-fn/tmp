import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLinks } from "./actions";
import { LinkTable } from "./link-table";
import { LinkForm } from "./link-form";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const links = await getLinks();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/posts">
                            <FileText className="h-4 w-4 mr-2" />
                            Manage Posts
                        </Link>
                    </Button>
                    <LinkForm />
                    {session && <UserNav user={session.user} />}
                </div>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Semua Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <LinkTable links={links} />
                </CardContent>
            </Card>
        </div>
    );
}
