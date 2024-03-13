'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import TeamsList from '@/components/TeamsListPopup'
import { useUserTeamsQuery } from '@/hooks/useUserTeamsQuery'
import { CreateTeamModal } from './CreateTeamModal'

export default function teamsPage() {
    const session = useSession()
    const { data: teams, error } = useUserTeamsQuery(
        session.data?.user.username,
    )
    return (
        <div className=" h-full w-full p-10">
            <TeamsList teams={teams} />
            <CreateTeamModal />
        </div>
    )
}
