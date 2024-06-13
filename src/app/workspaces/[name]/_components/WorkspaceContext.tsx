'use client'

import React, { createContext, ReactNode, useState } from 'react'

interface IWorkspaceContext {
    userRole: 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'
    workspace: WorkspaceType
}

export const WorkspaceContext = createContext<IWorkspaceContext>({
    userRole: 'NONE',
    workspace: {} as WorkspaceType,
})

type WorkspaceContextProviderProps = {
    children: ReactNode
    initial: {
        userRole?: WorkspaceRoleType
        workspace: WorkspaceType
    }
}

export const WorkspaceContextProvider = ({
    children,
    initial,
}: WorkspaceContextProviderProps) => {
    const [userRole] = useState<WorkspaceRoleType>(initial.userRole || 'NONE')
    const [workspace] = useState<WorkspaceType>(initial.workspace)
    return (
        <WorkspaceContext.Provider value={{ userRole, workspace: workspace }}>
            {children}
        </WorkspaceContext.Provider>
    )
}
