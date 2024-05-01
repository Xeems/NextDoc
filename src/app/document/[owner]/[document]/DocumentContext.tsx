'use client'

import React, { createContext, ReactNode, useState } from 'react'

interface DocumentContextInterface {
    userRole: 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'
}

export const DocumentContext = createContext<DocumentContextInterface>({
    userRole: 'NONE',
})

type WorkspaceContextProviderProps = {
    children: ReactNode
    initial: DocumentContextInterface
}

export const DocumentContextProvider = ({
    children,
    initial,
}: WorkspaceContextProviderProps) => {
    const [userRole] = useState<WorkspaceRoleType>(initial.userRole || 'NONE')

    return (
        <DocumentContext.Provider value={{ userRole }}>
            {children}
        </DocumentContext.Provider>
    )
}
