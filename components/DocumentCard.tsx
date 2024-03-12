import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './shadCn/ui/card'

type Props = {
    document: DocType
}

export default function DocumentCard({ document }: Props) {
    let docOwner: string
    if (document.team) docOwner = document.team.name
    else docOwner = document.user?.username as string

    return (
        <Link
            href={{
                pathname: `/document/${docOwner}/${document.idName}`,
            }}>
            <Card className="flex h-40 w-full flex-col gap-y-1 place-self-stretch rounded-md border border-solid border-border p-5 shadow-md transition-all hover:border-input hover:shadow-sm  ">
                <CardHeader className="flex-1 p-0">
                    <CardTitle className="text-lg">{document.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <CardDescription className=" text-wrap">
                        {document.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-1 items-end p-0">
                    by
                </CardFooter>
            </Card>
        </Link>
    )
}
