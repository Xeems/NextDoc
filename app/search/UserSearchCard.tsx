import { Avatar, AvatarImage } from '@/components/shadCn/ui/avatar'
import { Card, CardFooter, CardHeader } from '@/components/shadCn/ui/card'
import Link from 'next/link'

export default function UserSearchCard({ user }: { user: UserType }) {
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
