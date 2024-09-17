'use client'

import { CreatePostAction } from "@/app/actions";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { UploadDropzone } from "@/app/utils/uploadthings";
import { postSchema } from "@/app/utils/zodSchemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import slugify from 'react-slugify'
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";

export default function ArticleCreationRoute({ params }: { params: { siteId: string } }) {

    const [imageUrl, setImageUrl] = useState<undefined | string>(undefined)
    const [value, setValue] = useState<JSONContent | undefined>(undefined)
    const [title, setTitle] = useState<undefined | string>(undefined)
    const [slug, setSlugValue] = useState<undefined | string>(undefined)
    const [lastResult, action] = useFormState(CreatePostAction, undefined)
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: postSchema })
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })

    function handleSlugGeneration() {
        const titleInput = title

        if (titleInput?.length === 0 || titleInput === undefined) {
            return toast.error("Por favor, insira um título primeiro")
        }

        setSlugValue(slugify(titleInput))

        return toast.success('Slug gerado com sucesso')
    }

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
                    <form
                        className="flex flex-col gap-6"
                        id={form.id}
                        onSubmit={form.onSubmit}
                        action={action}
                    >
                        <Input type="hidden" name="siteId" value={params.siteId} />
                        <div className="grid gap-2">
                            <Label>Título</Label>
                            <Input
                                key={fields.title.key}
                                name={fields.title.name}
                                defaultValue={fields.title.initialValue} placeholder="Como criar um Saas em NextJS"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <p className="text-red-500 text-sm">{fields.title.errors}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label>Slug</Label>
                            <Input
                                key={fields.slug.key}
                                name={fields.slug.name}
                                defaultValue={fields.slug.initialValue}
                                placeholder="Slug do Artigo"
                                onChange={(e) => setSlugValue(e.target.value)}
                                value={slug}
                            />
                            <Button onClick={handleSlugGeneration} className="w-fit" variant="secondary" type="button">
                                <Atom className="size-4 mr-2" /> Gerar Slug
                            </Button>
                            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label>Pequena descrição</Label>
                            <Textarea
                                key={fields.smallDescription.key}
                                name={fields.smallDescription.name}
                                defaultValue={fields.smallDescription.initialValue}
                                placeholder="Pequena descrição pro artigo de seu blog..." className="h-32"
                            />
                            <p className="text-red-500 text-sm">{fields.smallDescription.errors}</p>
                        </div>

                        <div className="grid gap-2">
                            <Label>Imagem de capa</Label>
                            <Input
                                type="hidden"
                                key={fields.coverImage.key}
                                name={fields.coverImage.name}
                                defaultValue={fields.coverImage.initialValue}
                                value={imageUrl}
                            />
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

                            <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
                        </div>

                        <div className="grid gap-2">
                            <Label>Conteúdo do Artigo</Label>
                            <Input
                                type="hidden"
                                key={fields.articleContent.key}
                                name={fields.articleContent.name}
                                defaultValue={fields.articleContent.initialValue}
                                value={JSON.stringify(value)}
                            />
                            <p className="text-xs text-muted-foreground">Abra os comandos digitando "/"</p>
                            <TailwindEditor onChange={setValue} initialValue={value} />
                            <p className="text-red-500 text-sm">{fields.articleContent.errors}</p>
                        </div>

                        <SubmitButton text="Criar artigo"  />
                    </form>
                </CardContent>
            </Card>
        </>
    )
}