import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSiteRoute() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <Card className="max-w-[450px]">
                <CardHeader>
                    <CardTitle>Criar site</CardTitle>
                    <CardDescription>Crie seu site aqui. Clique o botao abaixo quando finalizar</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-6">
                        <div className="grid gap-2">
                            <Label>Nome do Site</Label>
                            <Input placeholder="Nome do Site" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Suddomínio</Label>
                            <Input placeholder="Suddomínio" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Descrição</Label>
                            <Textarea placeholder="Descrição de seu site" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Enviar</Button>
                </CardFooter>
            </Card>
        </div>
    )
}