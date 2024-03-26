'use client'

import React, { ReactNode, createContext, useState } from 'react'

interface DocumentContextInterface {
    userRole: 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'
}

export const DocumentContext = createContext<DocumentContextInterface>({
    userRole: 'NONE',
})

type TeamContextProviderProps = {
    children: ReactNode
    initial: DocumentContextInterface
}

export const DocumentContextProvider = ({
    children,
    initial,
}: TeamContextProviderProps) => {
    const [userRole] = useState<TeamRoleType>(initial.userRole || 'NONE')
    return (
        <DocumentContext.Provider value={{ userRole }}>
            {children}
        </DocumentContext.Provider>
    )
}
