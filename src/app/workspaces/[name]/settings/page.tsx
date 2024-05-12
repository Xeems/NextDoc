import {
    useWorkspaceQuery,
    workspaceQuery,
} from '@/src/hooks/querys/useWorkspace'
import React from 'react'
import NameForm from './NameFrom'
import { notFound } from 'next/navigation'
import WorkspaceAvatar from './WorkspaceAvatar'

type Props = {
    params: {
        name: string
    }
}

const WorkspaceSettingsPage = async ({ params: { name } }: Props) => {
    const { data, error } = await workspaceQuery(name)

    if (data?.userRole == 'NONE') notFound()

    if (!data || error) notFound()
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
                <WorkspaceAvatar />
            </div>
        </div>
    )
}

export default WorkspaceSettingsPage
