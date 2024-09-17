import { DeletePostAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function DeleteForm({ params }: { params: { siteId: string, articleId: string } }) {
    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>
                        Você tem certeza?
                    </CardTitle>
                    <CardDescription>Essa ação não poderá ser desfeita. O artigo será excluído de nosso banco de dados para sempre!</CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex space-x-4">
                    <Button variant='secondary' asChild>
                        <Link href={`/dashboard/sites/${params.siteId}`}>Cancelar</Link>
                    </Button>
                    <form action={DeletePostAction}>
                        <Input type="hidden" name="articleId" value={params.articleId} />
                        <Input type="hidden" name="siteId" value={params.siteId} />
                        <SubmitButton variant='destructive' text="Excluir Artigo" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}