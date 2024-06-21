import Link from 'next/link'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/src/components/shadCn/ui/card'
import { ROUTES } from '@/src/lib/routes'

export default function DocumentSearchCard({ doc }: { doc: DocType }) {
    return (
        <Card className="w-full space-y-1 py-2">
            <CardHeader className="flex flex-row items-center pb-0 pt-1 text-lg  font-bold text-foreground-link">
                <div>
                    <Link
                        className="my-0"
                        href={ROUTES.WORKSPACE(doc.workspace?.name!)}>
                        {doc.workspace?.name}
                    </Link>
                    {' / '}
                    <Link
                        className="my-0"
                        href={ROUTES.DOCUMENT(
                            doc.workspace?.name!,
                            doc.urlName,
                        )}>
                        {doc.name}
                    </Link>
                </div>
            </CardHeader>
            <CardContent className=" py-1">{doc.description}</CardContent>
            <CardFooter className="py-1 text-xs  text-muted-foreground">
                Created at {doc.createdAt.toLocaleDateString()}{' '}
            </CardFooter>
        </Card>
    )
}
