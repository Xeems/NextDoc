import { Avatar, AvatarImage } from '@/components/shadCn/ui/avatar'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from '@/components/shadCn/ui/card'
import Link from 'next/link'

type Props = {
    searchResult: UserType | DocType | TeamType
}
export default function SearchResultCard({ searchResult }: Props) {
    const type = checkSearchResultType({ searchResult })
    switch (type) {
        case 'document': {
            const doc: DocType = searchResult as DocType
            return <DocumentResultCard doc={doc} />
        }
        case 'user': {
            const user: UserType = searchResult as UserType
            return <UserResultCard user={user} />
        }
    }
}

function DocumentResultCard({ doc }: { doc: DocType }) {
    return (
        <Card className="w-full space-y-1 py-2">
            <CardHeader className="font-bold text-lg text-foreground-link flex pt-1 pb-0  flex-row items-center">
                {doc.documentOwnerType == 'USER' && (
                    <div>
                        <Link
                            className="my-0"
                            href={`users/${doc.user?.username}`}>
                            {doc.user?.username}
                        </Link>
                        /
                        <Link
                            className="my-0"
                            href={`document/${doc.user?.username}/${doc.idName}`}>
                            {doc.name}
                        </Link>
                    </div>
                )}
                {doc.documentOwnerType == 'TEAM' && (
                    <div>
                        <Link href={`teams/${doc.team?.name}`}>
                            {doc.team?.name}
                        </Link>
                        /
                        <Link href={`document/${doc.team?.name}/${doc.idName}`}>
                            {doc.name}
                        </Link>
                    </div>
                )}
            </CardHeader>
            <CardContent className=" py-1">{doc.description}</CardContent>
            <CardFooter className="text-muted-foreground text-xs  py-1">
                Created at {doc.createdAt.toLocaleDateString()}
            </CardFooter>
        </Card>
    )
}

function UserResultCard({ user }: { user: UserType }) {
    return (
        <Card className="w-full space-y-1 py-2">
            <CardHeader className="font-bold text-lg text-foreground-link items-center gap-x-2 flex pt-1 pb-0  flex-row ">
                <Avatar className="size-5">
                    <AvatarImage src={user.image as string} />
                </Avatar>
                <Link href={`users/${user.username}`} className="text-start">
                    {user.username} ({user.name})
                </Link>
            </CardHeader>
            {/* <CardContent className=" py-1">{doc.description}</CardContent> */}
            <CardFooter className="text-muted-foreground text-xs  py-1">
                Created at {user.createdAt!.toLocaleDateString()}
            </CardFooter>
        </Card>
    )
}

function checkSearchResultType({ searchResult }: Props) {
    if (typeof searchResult === 'object') {
        if ('username' in searchResult) {
            return 'user'
        } else if ('type' in searchResult) {
            return 'document'
        } else if ('documents' in searchResult) {
            return 'team'
        }
    }
    return undefined
}
