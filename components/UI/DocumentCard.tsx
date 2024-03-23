import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../shadCn/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../shadCn/ui/avatar'

type Props = {
    document: DocType
    withFooter?: boolean
}

export default function DocumentCard({ document, withFooter = true }: Props) {
    let docOwner: string
    if (document.team) docOwner = document.team.name
    else docOwner = document.user?.username as string

    return (
        <Link
            href={{
                pathname: `/document/${docOwner}/${document.idName}`,
            }}>
            <Card className="flex w-full flex-col gap-y-1 place-self-stretch rounded-md border border-solid border-border p-5 shadow-md transition-all hover:border-input hover:shadow-sm  ">
                <CardHeader className="flex-1 p-0">
                    <CardTitle className="text-lg">{document.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 py-2">
                    <CardDescription className=" text-wrap">
                        {document.description}
                    </CardDescription>
                </CardContent>
                {withFooter && (
                    <CardFooter className="flex items-end p-0 pt-2">
                        <div className="flex flex-row items-center gap-x-2">
                            by
                            <Avatar className="size-5">
                                <AvatarImage src={document.user?.image!} />
                                <AvatarFallback />
                            </Avatar>
                            <span className="text-center font-light">
                                {document.user?.username}
                            </span>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </Link>
    )
}
