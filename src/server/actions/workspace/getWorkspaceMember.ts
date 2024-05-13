'use server'

import { getWorkspaceMember } from '@/src/server/db/workspace.data'
import { getUserBySessionAction } from '../user/getUserBySession'

export const getWorkspaceMemberAction = async (
    workspaceId: string,
    userId?: string,
) => {
    try {
        if (!userId) {
            // if userId is not provided, get user from session
            const user = await getUserBySessionAction()
            if (!user) return null
            const res = await getWorkspaceMember(user?.id, workspaceId)
            return { data: res }
        }
        const res = await getWorkspaceMember(userId, workspaceId)
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
