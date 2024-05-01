'use server'

import { getWorkspacesMembers } from '@/src/server/db/workspace.data'

export const getWorkspaceMembersAction = async (workspaceName: string) => {
    try {
        const res = await getWorkspaceMembers(workspaceName)
        if (!res) throw new Error('user workspaces db query failed')
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user workspaces' }
    }
}
