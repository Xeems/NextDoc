'use client'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/shadCn/ui/avatar'
import React from 'react'
import { useSession } from 'next-auth/react'
import TeamsList from '@/components/TeamsList'
import { useUserTeamsQuery } from '@/hooks/useUserTeamsQuery'
import { useUserDocumentsQuery } from '@/hooks/useUserDocumentsQuery'
import DocumentList from '@/components/DocumentList'
import { Button } from '@/components/shadCn/ui/button'
import { CreateUserDocumentModal } from './CreateUserDocumentModal'

type Props = {
    params: {
        username: string
    }
}
export default function UserPage({ params }: Props) {
    const { data: teams, error } = useUserTeamsQuery(params.username)
    const { data: documents } = useUserDocumentsQuery(params.username)
    const { data: session } = useSession()
    return (
        <div className=" flex w-full flex-row  gap-y-5 bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem]">
            <div className="flex h-fit w-1/4 flex-col justify-stretch  p-2">
                <div className="flex flex-row items-center  gap-x-4">
                    <Avatar className="size-20 border">
                        <AvatarImage src={session?.user.image} />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold tracking-wide">
                            {session?.user.username}
                        </span>
                        <span className="font-light text-muted-foreground">
                            {session?.user.name}
                        </span>
                    </div>
                </div>
                <span className="my-4 text-xl font-semibold">Teams</span>
                <TeamsList variant="popup" teams={teams} />
            </div>
            <div className="flex h-fit w-3/4 flex-col">
                <div className="flex items-center justify-between">
                    <span className="m-2 text-lg">Documents</span>
                    <CreateUserDocumentModal>
                        <Button>Create new document</Button>
                    </CreateUserDocumentModal>
                </div>
                {documents && <DocumentList documents={documents} />}
            </div>
        </div>
    )
}