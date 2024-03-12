'use server'

import { getUserTeams } from '@/server/db/team.data'

export const getUserTeamsAction = async (userId: string) => {
    try {
        const res = await getUserTeams(userId)
        if (!res) throw new Error('user teams db query failed')
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
