import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/shadCn/ui/card'
import Link from 'next/link'

export default function DocumentSearchCard({ doc }: { doc: DocType }) {
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
                        {' / '}
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
