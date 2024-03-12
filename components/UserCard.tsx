import React from 'react'
import { Card, CardContent } from './shadCn/ui/card'
import { Avatar, AvatarImage } from './shadCn/ui/avatar'

export default function UserCard({ user }: { user: UserType }) {
    return (
        <Card className="items-center p-0">
            <CardContent className="m-auto inline-flex items-center gap-x-4 py-2 ">
                <Avatar className="size-8">
                    <AvatarImage src={user.image as string} />
                </Avatar>
                <div className="flex flex-col ">
                    <span>{user.username}</span>
                    <span className="text-sm text-muted-foreground">
                        {user.name}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
