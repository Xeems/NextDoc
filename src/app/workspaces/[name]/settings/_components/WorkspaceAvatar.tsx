'use client'

import React, { useRef, useContext } from 'react'
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
import { toast } from 'sonner'
import { WorkspaceContext } from '../../_components/WorkspaceContext'
import { upload } from '@vercel/blob/client'
import { updateWorkspaceAvatar } from '@/src/server/db/workspace.data'

type Props = {
    avatarUrl: string | null
}
const WorkspaceAvatar = ({ avatarUrl }: Props) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const workspaceContext = useContext(WorkspaceContext)

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = async () => {
        const file = fileInputRef.current?.files?.[0]
        if (!file) throw new Error('No file')

        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/workspaces/uploadAvatar',
                clientPayload: `${workspaceContext.workspaceId}`,
            })

            if (newBlob) {
                const res = await updateWorkspaceAvatar(
                    workspaceContext.workspaceId,
                    newBlob.url,
                )
            }
        } catch (error) {
            toast.error('Failed to upload avatar')
        }
    }

    return (
        <Card className="flex flex-row items-center justify-between">
            <div>
                <CardHeader className="col-start-1">
                    <CardTitle>Workspace avatar</CardTitle>
                </CardHeader>
                <CardContent className="col-start-2">
                    <CardDescription>
                        This is your team's avatar. <br /> Click on the avatar
                        to upload a custom one from your files.
                    </CardDescription>
                </CardContent>
            </div>
            <div>
                <Avatar
                    className="row-span-2 mr-10 size-20 hover:cursor-pointer"
                    onClick={handleAvatarClick}>
                    <AvatarImage src={avatarUrl ?? undefined} />
                    <AvatarFallback className="bg-blue-300" />
                </Avatar>

                <input
                    hidden
                    type="file"
                    id="avatar"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>
        </Card>
    )
}

export default WorkspaceAvatar
