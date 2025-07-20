import Link from 'next/link'

import { Avatar, AvatarImage } from '@/src/components/shadCn/ui/avatar'
import { Card, CardFooter, CardHeader } from '@/src/components/shadCn/ui/card'

export default function UserSearchCard({ user }: { user: UserType }) {
    return (
        <Card className="w-full space-y-1 py-2">
            <CardHeader className="flex flex-row items-center gap-x-2 pb-0 pt-1 text-lg font-bold  text-foreground-link ">
                <Avatar className="size-5">
                    <AvatarImage src={user.image as string} />
                </Avatar>
                <Link href={`users/${user.username}`} className="text-start">
                    {user.username} ({user.name})
                </Link>
            </CardHeader>
            {/* <CardContent className=" py-1">{doc.description}</CardContent> */}
            <CardFooter className="py-1 text-xs  text-muted-foreground">
                Created at {user.createdAt!.toLocaleDateString()}
            </CardFooter>
        </Card>
    )
}
