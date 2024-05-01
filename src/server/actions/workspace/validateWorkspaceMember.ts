'use server'

import { getWorkspaceMember } from '@/src/server/db/workspace.data'

export const validateWorkspaceMemberAction = async (
    userId: string,
    teamId: string,
) => {
    try {
        const res = await getWorkspaceMember(userId, teamId)
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
