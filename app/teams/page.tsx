'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import TeamsList from '@/components/UI/TeamsList'
import { useUserTeamsQuery } from '@/hooks/useUserTeamsQuery'
import { CreateTeamModal } from './CreateTeamModal'
import { Button } from '@/components/shadCn/ui/button'

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
