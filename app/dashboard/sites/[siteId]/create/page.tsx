'use client'

import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { UploadDropzone } from "@/app/utils/uploadthings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";

export default function ArticleCreationRoute({ params }: { params: { siteId: string } }) {

    const [imageUrl, setImageUrl] = useState<undefined | string>(undefined)
    const [value, setValue] = useState<JSONContent | undefined>(undefined)

    return (
        <>
            <div className="flex items-center">
                <Button size="icon" variant="outline" className="mr-3" asChild>
                    <Link href={`/dashboard/sites/${params.siteId}`}>
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold">Criar Artigo</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detalhes do Artigo</CardTitle>
                    <CardDescription>Descreva os detalhes de seu artigo</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label>Título</Label>
                            <Input placeholder="Como criar um Saas em NextJS"></Input>
                        </div>
                        <div className="grid gap-2">
                            <Label>Slug</Label>
                            <Input placeholder="Slug do Artigo"></Input>
                            <Button className="w-fit" variant="secondary" type="button">
                                <Atom className="size-4 mr-2" /> Gerar Slug
                            </Button>
                        </div>
                        <div className="grid gap-2">
                            <Label>Pequena descrição</Label>
                            <Textarea placeholder="Pequena descrição pro artigo de seu blog..." className="h-32" />
                        </div>

                        <div className="grid gap-2">
                            <Label>Imagem de capa</Label>
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt="Imagem anexada"
                                    className="object-cover w-[200px] h-[200px] rounded-lg"
                                    width={200}
                                    height={200}
                                />
                            ) : (
                                <UploadDropzone
                                    onClientUploadComplete={
                                        (res) => {
                                            setImageUrl(res[0].url)
                                            toast.success('Imagem carregada com sucesso')
                                        }}
                                    endpoint="imageUploader"
                                    onUploadError={() => {
                                        toast.success('Algo deu errado...')
                                    }}

                                    content={{
                                        label({ ready }) {
                                            if (ready) return "Fazer upload de imagem"
                                            if (!ready) return "Carregando...";
                                        },
                                        button({ ready, uploadProgress, }) {
                                            if (ready) return <div>Carregar</div>;
                                            if (uploadProgress) return "Fazendo upload";
                                            return "Carregando...";
                                        },
                                    }}
                                />
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label>Conteúdo do Artigo</Label>
                            <p className="text-xs text-muted-foreground">Abra os comandos digitando "/"</p>
                            <TailwindEditor onChange={setValue} initialValue={value} />
                        </div>

                        <Button className="w-fit">Enviar</Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}