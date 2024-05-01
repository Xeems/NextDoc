'use server'

import { getUserWorkspaces } from '@/src/server/db/workspace.data'

export const getUserWorkspacesAction = async (username: string) => {
    try {
        const res = await getUserWorkspaces(username)
        if (!res) throw new Error('user teams db query failed')

        return { data: res }
    } catch (error) {
        console.error(error)
        return { error: 'Failed to get user teams' }
    }
}
