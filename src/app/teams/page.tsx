'use client'

import { Button } from '@/src/components/shadCn/ui/button'
import TeamsList from '@/src/components/UI/TeamsList'
import { useUserTeamsQuery } from '@/src/hooks/querys/useUserTeamsQuery'
import { useSession } from 'next-auth/react'
import React from 'react'

import { CreateTeamModal } from './CreateTeamModal'

export default function teamsPage() {
    const session = useSession()
    const { data: teams, error } = useUserTeamsQuery(
        session.data?.user.username,
    )
    return (
        <div className=" flex h-full w-full flex-col items-center p-10">
            <h1>Teams</h1>
            <TeamsList teams={teams} />
            <CreateTeamModal>
                <Button></Button>
            </CreateTeamModal>
        </div>
    )
}
