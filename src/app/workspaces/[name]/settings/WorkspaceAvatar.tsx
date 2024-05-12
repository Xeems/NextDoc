'use client'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/src/components/shadCn/ui/avatar'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/src/components/shadCn/ui/card'
import React from 'react'

const WorkspaceAvatar = () => {
    return (
        <Card className="flex flex-row items-center justify-between">
            <div>
                <CardHeader className="col-start-1">
                    <CardTitle>Workspace avatar</CardTitle>
                </CardHeader>
                <CardContent className="col-start-2">
                    <CardDescription>
                        This is your team's avatar. Click on the avatar to
                        upload acustom one from your files.
                    </CardDescription>
                </CardContent>
            </div>
            <div>
                <Avatar className="row-span-2 mr-10 size-20">
                    <AvatarImage />
                    <AvatarFallback />
                </Avatar>
            </div>
        </Card>
    )
}

export default WorkspaceAvatar
