'use client'

import React, { ReactNode, createContext, useState } from 'react'

interface TeamContextType {
    userRole: 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'
    teamId: string
}

export const TeamContext = createContext<TeamContextType>({
    userRole: 'NONE',
    teamId: '',
})

type TeamContextProviderProps = {
    children: ReactNode
    initial: {
        TeamTole?: TeamRoleType
        teamId: string
    }
}

export const TeamContextProvider = ({
    children,
    initial,
}: TeamContextProviderProps) => {
    const [userRole] = useState<TeamRoleType>(initial.TeamTole || 'NONE')
    const [teamId] = useState<string>(initial.teamId)
    return (
        <TeamContext.Provider value={{ userRole, teamId }}>
            {children}
        </TeamContext.Provider>
    )
}
