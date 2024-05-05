'use client'

import React, { createContext, ReactNode, useState } from 'react'

interface IWorkspaceContext {
    userRole: 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'
    workspaceId: string
}

export const WorkspaceContext = createContext<IWorkspaceContext>({
    userRole: 'NONE',
    workspaceId: '',
})

type WorkspaceContextProviderProps = {
    children: ReactNode
    initial: {
        workspaceRole?: WorkspaceRoleType
        workspaceId: string
    }
}

export const WorkspaceContextProvider = ({
    children,
    initial,
}: WorkspaceContextProviderProps) => {
    console.log('initial set context')
    const [userRole] = useState<WorkspaceRoleType>(
        initial.workspaceRole || 'NONE',
    )
    const [workspaceId] = useState<string>(initial.workspaceId)
    return (
        <WorkspaceContext.Provider value={{ userRole, workspaceId }}>
            {children}
        </WorkspaceContext.Provider>
    )
}
