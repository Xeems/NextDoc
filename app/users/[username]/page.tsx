import { CreateTeamModal } from '@/app/teams/CreateTeamModal'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/shadCn/ui/avatar'
import { Button } from '@/components/shadCn/ui/button'
import DocumentList from '@/components/UI/DocumentList'
import TeamsList from '@/components/UI/TeamsList'
import { userDocumentsQuery } from '@/hooks/querys/useUserDocumentsQuery'
import { userQuery } from '@/hooks/querys/useUserQuery'
import { userTeamsQuery } from '@/hooks/querys/useUserTeamsQuery'
import { PlusSquareIcon } from 'lucide-react'
import React from 'react'

import { CreateUserDocumentModal } from './CreateUserDocumentModal'

type Props = {
    params: {
        username: string
    }
}
export default async function UserPage({ params }: Props) {
    const [teamsData, userData, documentsData] = await Promise.all([
        userTeamsQuery(params.username),
        userQuery(params.username),
        userDocumentsQuery(params.username),
    ])

    if (userData.error || teamsData.error || documentsData.error)
        throw new Error()

    const { user, isSameUser } = userData
    const { data: documents } = documentsData
    const { data: teams } = teamsData
    return (
        <div className=" flex w-full flex-col lg:flex-row  gap-y-5 bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem]">
            <div className="flex h-fit w-full lg:w-1/4 flex-col justify-stretch  p-2">
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
                <span className="my-4 text-xl font-semibold">Teams</span>
                <TeamsList variant="popup" teams={teams} />
                {isSameUser && (
                    <CreateTeamModal>
                        <Button
                            variant={'ghost'}
                            className="justify-start gap-x-2">
                            <PlusSquareIcon className="h-4 w-4" />
                            Create team
                        </Button>
                    </CreateTeamModal>
                )}
            </div>

            <div className="flex h-fit lg:w-3/4 flex-col pb-4">
                <div className="mb-4 flex items-center justify-between">
                    <span className="m-2 text-xl font-semibold">Documents</span>
                    {isSameUser && (
                        <CreateUserDocumentModal>
                            <Button variant={'secondary'}>
                                Create new document
                            </Button>
                        </CreateUserDocumentModal>
                    )}
                </div>
                {documents && (
                    <DocumentList documents={documents} withFooter={false} />
                )}
            </div>
        </div>
    )
}
