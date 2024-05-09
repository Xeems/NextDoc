import {
    useWorkspaceQuery,
    workspaceQuery,
} from '@/src/hooks/querys/useWorkspace'
import React from 'react'
import NameCard from './NameCard'
import { notFound } from 'next/navigation'

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
            <div className="w-full p-4 lg:max-w-[60rem]">
                <NameCard
                    workspaceId={data.workspace.id}
                    workspaceName={data.workspace.name}
                />
            </div>
        </div>
    )
}

export default WorkspaceSettingsPage
