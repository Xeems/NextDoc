'use client'

import React, { createContext, ReactNode, useState } from 'react'

interface WorkspaceContextType {
    userRole: 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'
    workspaceId: string
}

export const WorkspaceContext = createContext<WorkspaceContextType>({
    userRole: 'NONE',
    workspaceId: '',
})

type WorkspaceContextProviderProps = {
    children: ReactNode
    initial: {
        WorkspaceRole?: WorkspaceRoleType
        workspaceId: string
    }
}

export const WorkspaceContextProvider = ({
    children,
    initial,
}: WorkspaceContextProviderProps) => {
    const [userRole] = useState<WorkspaceRoleType>(
        initial.WorkspaceRole || 'NONE',
    )
    const [workspaceId] = useState<string>(initial.workspaceId)
    return (
        <WorkspaceContext.Provider value={{ userRole, workspaceId }}>
            {children}
        </WorkspaceContext.Provider>
    )
}
