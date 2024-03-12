'use server'

import { getTeam } from '@/server/db/team.data'

type Props = {
    userId: string
    teamName: string
}

export const getTeamAction = async ({ teamName, userId }: Props) => {
    try {
        const res = await getTeam(teamName)
        if (!res) throw new Error('User team db query failed')
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
