'use client'

import { CreateSiteAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from '@conform-to/react'
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/app/utils/zodSchemas";
import { useFormState } from "react-dom";

export default function NewSiteRoute() {
    const [lastResult, action] = useFormState(CreateSiteAction, {})
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: siteSchema,
            })
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <form id={form.id} onSubmit={form.onSubmit} action={action}>
                <Card className="max-w-[450px]">
                    <CardHeader>
                        <CardTitle>Criar site</CardTitle>
                        <CardDescription>Crie seu site aqui. Clique o botao abaixo quando finalizar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-y-6">
                            <div className="grid gap-2">
                                <Label>Nome do Site</Label>
                                <Input
                                    name={fields.name.name}
                                    key={fields.name.key}
                                    defaultValue={fields.name.initialValue} placeholder="Nome do Site"
                                />
                                <p className="text-red-500 text-sm">{fields.name.errors}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label>Suddomínio</Label>
                                <Input
                                    name={fields.subdirectory.name}
                                    key={fields.subdirectory.key}
                                    defaultValue={fields.subdirectory.initialValue}
                                    placeholder="Suddomínio" />
                                <p className="text-red-500 text-sm">{fields.subdirectory.errors}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label>Descrição</Label>
                                <Textarea
                                    name={fields.description.name}
                                    key={fields.description.key}
                                    defaultValue={fields.description.initialValue}
                                    placeholder="Descrição de seu site"
                                />
                                <p className="text-red-500 text-sm">{fields.description.errors}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Enviar</Button>
                    </CardFooter>
                </Card>
            </form>

        </div>
    )
}