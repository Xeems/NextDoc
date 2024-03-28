'use server'

import { getTeamMember } from '@/server/db/team.data'

export const validateTeamMemberAction = async (
    userId: string,
    teamId: string,
) => {
    try {
        const res = await getTeamMember(userId, teamId)
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
