'use client'

import { Button } from '@/src/components/shadCn/ui/button'
import WorkspacesList from '@/src/components/UI/WorkspacesList'
import { useUserWorkspacesQuery } from '@/src/hooks/querys/useUserWorkspaces'
import { useSession } from 'next-auth/react'
import React from 'react'

import { CreateWorkspaceModal } from './CreateWorkspaceModal'

export default function workspacesPage() {
    const session = useSession()
    const { data: workspaces, error } = useUserWorkspacesQuery(
        session.data?.user.username,
    )
    return (
        <div className=" flex h-full w-full flex-col items-center p-10">
            <h1>Workspaces</h1>
            <WorkspacesList workspaces={workspaces} />
            <CreateWorkspaceModal>
                <Button></Button>
            </CreateWorkspaceModal>
        </div>
    )
}
