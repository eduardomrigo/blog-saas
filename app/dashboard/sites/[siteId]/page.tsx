import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId: string, siteId: string) {
    const data = await prisma.article.findMany({
        where: {
            userId: userId,
            siteId: siteId,
        },
        select: {
            image: true,
            title: true,
            createdAt: true,
            id: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return data
}

export default async function SiteIdRoute({ params }: { params: { siteId: string } }) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        return redirect('/api/auth/login')
    }

    const data = await getData(user.id, params.siteId)

    return (
        <>
            <div className="flex w-full justify-end gap-x-4">
                <Button asChild variant="secondary">
                    <Link href="#">
                        <Book className="size-4 mr-2" />
                        Ver Blog
                    </Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href="#">
                        <Settings className="size-4 mr-2" />
                        Configurações
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="#">
                        <PlusCircle className="size-4 mr-2" />
                        Criar Artigo
                    </Link>
                </Button>
            </div>

            {data === undefined || data.length === 0 ? (
                <h1>vazio</h1>
            ) : (
                <h1>dados aqui</h1>
            )}
        </>
    )
}