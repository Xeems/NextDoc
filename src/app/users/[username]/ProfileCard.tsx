import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/src/components/shadCn/ui/avatar'
import React from 'react'

export default function ProfileCard({ user }: { user: UserType }) {
    return (
        <div className="flex flex-row items-center  gap-x-4">
            <Avatar className="size-20 border">
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-2xl font-semibold tracking-wide">
                    {user.username}
                </span>
                <span className="font-light text-muted-foreground">
                    {user.name}
                </span>
            </div>
        </div>
    )
}
