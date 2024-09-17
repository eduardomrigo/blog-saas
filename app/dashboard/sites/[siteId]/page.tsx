import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, FileIcon, MoreHorizontal, Pencil, PlusCircle, Settings, Trash } from "lucide-react";
import Image from "next/image";
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
                    <Link href={`/dashboard/sites/${params.siteId}/create`}>
                        <PlusCircle className="size-4 mr-2" />
                        Criar Artigo
                    </Link>
                </Button>
            </div>

            {data === undefined || data.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
                    <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                        <FileIcon className="size-10 text-primary" />
                    </div>
                    <h2 className="mt-6 text-xl font-semibold">Nenhum site encontrado</h2>
                    <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground  mx-auto">Você ainda não criou um site. Crie sites para poder visualizá-los</p>
                    <Button asChild>
                        npx shadcn@latest add table
                        <Link href="/dashboard/sites/new">
                            <PlusCircle className="size-4 mr-2" />
                            Criar site
                        </Link>
                    </Button>
                </div>
            ) : (
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Artigos</CardTitle>
                            <CardDescription>Gerencie seus artigos com uma interface simples e intuitiva</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Imagem</TableHead>
                                        <TableHead>Título</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Criado em</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Image src={item.image} width={64} height={64} alt="Imagem de capa do Artigo" className="size-16 rounded-md object-cover" />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-green-500/10 text-green-500">Publicado</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Intl.DateTimeFormat('pt-BR', {
                                                    dateStyle: 'short',
                                                }).format(item.createdAt)}
                                            </TableCell>
                                            <TableCell className="text-end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            <MoreHorizontal className="size-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Ações
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Pencil className=" text-blue-500 mr-2 size-4" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Trash className="text-red-500 mr-2 size-4" />
                                                            Excluir
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}