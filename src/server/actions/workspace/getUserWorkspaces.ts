'use server'

import { UserWorkspacesQueryType } from '@/@types/validators/workspace'
import { getUserWorkspaces } from '@/src/server/db/workspace.data'

export const getUserWorkspacesAction = async (
    data: UserWorkspacesQueryType,
) => {
    try {
        const res = await getUserWorkspaces(data)
        if (!res) throw new Error('user teams db query failed')

        return { data: res }
    } catch (error) {
        console.error(error)
        return { error: 'Failed to get user teams' }
    }
}
