'use server'

import { getworkspace } from '@/src/server/db/workspace.data'

type Props = {
    userId: string
    workspaceName: string
}

export const getWorkspaceAction = async ({ workspaceName, userId }: Props) => {
    try {
        const res = await getworkspace(workspaceName)
        if (!res) throw new Error('User workspace db query failed')
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user workspaces' }
    }
}
