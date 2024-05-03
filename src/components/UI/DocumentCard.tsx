import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '../shadCn/ui/avatar'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../shadCn/ui/card'

type Props = {
    document: DocType
    withFooter?: boolean
}

export default function DocumentCard({ document, withFooter = true }: Props) {
    return (
        <Link
            href={`/workspaces/${document.workspace?.name}/document/${document.idName}`}>
            <Card className="flex h-full w-full flex-col gap-y-1 place-self-stretch rounded-md border border-solid border-border px-5 py-4 shadow-md transition-all hover:border-input hover:shadow-sm  ">
                <CardHeader className="flex-1 p-0">
                    <CardTitle className="line-clamp-2 overflow-clip text-lg">
                        {document.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 py-2">
                    <CardDescription className="line-clamp-2 text-wrap text-justify">
                        {document.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="p-0 text-xs font-light text-muted-foreground">
                    {`Created at: ${document.createdAt.toLocaleDateString().toString()}`}
                </CardFooter>
            </Card>
        </Link>
    )
}
