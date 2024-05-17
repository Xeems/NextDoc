import { workspaceQuery } from '@/src/hooks/querys/useWorkspace'
import React from 'react'
import NameForm from './_components/NameFrom'
import { notFound } from 'next/navigation'
import WorkspaceAvatar from './_components/WorkspaceAvatar'
import DeleteWorkspace from './_components/DeleteWorkspace'

type Props = {
    params: {
        name: string
    }
}

const WorkspaceSettingsPage = async ({ params: { name } }: Props) => {
    const { data, error } = await workspaceQuery(name)

    if (!data || error || data?.userRole == 'NONE') notFound()

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex h-24 w-full items-center ">
                <h1 className="mx-[5%] text-3xl font-medium">Settings</h1>
            </div>
            <div className="w-full space-y-6 p-4 lg:max-w-[60rem]">
                <NameForm
                    workspaceId={data.workspace.id}
                    workspaceName={data.workspace.name}
                />
                <WorkspaceAvatar avatarUrl={data.workspace.imageLink} />
                <DeleteWorkspace />
            </div>
        </div>
    )
}

export default WorkspaceSettingsPage
