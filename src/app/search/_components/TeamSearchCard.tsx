import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/src/components/shadCn/ui/card'
import Link from 'next/link'

export default function UserSearchCard({ team }: { team: WorspaceType }) {
    return (
        <Card className="w-full space-y-1 py-2">
            <CardHeader className="font-bold text-lg text-foreground-link items-center gap-x-2 flex pt-1 pb-0  flex-row ">
                <Link href={`teams/${team.name}`} className="text-start">
                    {team.name}
                </Link>
            </CardHeader>
            <CardContent className=" py-1">{team.description}</CardContent>
            <CardFooter className="text-muted-foreground text-xs  py-1">
                Created at {team.createdAt!.toLocaleDateString()}
            </CardFooter>
        </Card>
    )
}
