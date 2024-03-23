import React from 'react'
import { Card, CardContent } from '../shadCn/ui/card'
import { Avatar, AvatarImage } from '../shadCn/ui/avatar'
import { cn } from '@/lib/utils'

type Props = {
    user: UserType
    variant?: 'simple' | 'full'
}
export default function UserCard({ user, variant = 'full' }: Props) {
    return (
        <Card className="items-center p-0">
            <CardContent className="m-auto inline-flex items-center gap-x-4 py-2 ">
                <Avatar className="size-8">
                    <AvatarImage src={user.image as string} />
                </Avatar>
                <div className="flex flex-col ">
                    {variant == 'full' && (
                        <span className="text-sm text-muted-foreground">
                            {user.name}
                        </span>
                    )}
                    <span>{user.username}</span>
                </div>
            </CardContent>
        </Card>
    )
}
