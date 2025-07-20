import Link from 'next/link'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/src/components/shadCn/ui/card'

export default function UserSearchCard({ team }: { team: WorkspaceType }) {
    return (
        <Card className="w-full space-y-1 py-2">
            <CardHeader className="flex flex-row items-center gap-x-2 pb-0 pt-1 text-lg font-bold  text-foreground-link ">
                <Link href={`teams/${team.name}`} className="text-start">
                    {team.name}
                </Link>
            </CardHeader>
            <CardContent className=" py-1">{team.description}</CardContent>
            <CardFooter className="py-1 text-xs  text-muted-foreground">
                Created at {team.createdAt!.toLocaleDateString()}
            </CardFooter>
        </Card>
    )
}
