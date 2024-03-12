'use server'

import { getTeamMembers } from '@/server/db/team.data'

export const getTeamMembersAction = async (teamName: string) => {
    try {
        const res = await getTeamMembers(teamName)
        if (!res) throw new Error('user teams db query failed')
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
