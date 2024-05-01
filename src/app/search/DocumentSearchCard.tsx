import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/src/components/shadCn/ui/card'
import Link from 'next/link'

export default function DocumentSearchCard({ doc }: { doc: DocType }) {
    return (
        <Card className="w-full space-y-1 py-2">
            <CardHeader className="font-bold text-lg text-foreground-link flex pt-1 pb-0  flex-row items-center">
                <div>
                    <Link
                        className="my-0"
                        href={`users/${doc.worksapce?.name}`}>
                        {doc.worksapce?.name}
                    </Link>
                    {' / '}
                    <Link
                        className="my-0"
                        href={`document/${doc.worksapce?.name}/${doc.idName}`}>
                        {doc.name}
                    </Link>
                </div>
            </CardHeader>
            <CardContent className=" py-1">{doc.description}</CardContent>
            <CardFooter className="text-muted-foreground text-xs  py-1">
                Created at {doc.createdAt.toLocaleDateString()}
            </CardFooter>
        </Card>
    )
}
