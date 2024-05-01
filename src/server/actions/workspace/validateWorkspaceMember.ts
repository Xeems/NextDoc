'use server'

import { getWorkspaceMember } from '@/src/server/db/workspace.data'

export const getWorkspaceMemberAction = async (
    userId: string,
    workspaceId: string,
) => {
    try {
        const res = await getWorkspaceMember(userId, workspaceId)
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
