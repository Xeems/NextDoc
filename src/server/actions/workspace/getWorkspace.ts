'use server'

import { getWorkspace } from '@/src/server/db/workspace.data'
import { getUserBySessionAction } from '../user/getUserBySession'
import { getWorkspaceMemberAction } from './getWorkspaceMember'

export const getWorkspaceAction = async (workspaceName: string) => {
    const user = await getUserBySessionAction()

    try {
        const workspace = await getWorkspace(workspaceName)
        if (!workspace) throw new Error('Workspace not found')

        let role: WorkspaceRoleType = 'NONE'
        if (user) {
            const workspaceUser = await getWorkspaceMemberAction(
                user.id,
                workspace?.id,
            )
            role = workspaceUser.data?.role || 'NONE'
        }

        return {
            data: {
                workspace: workspace,
                userRole: role,
            },
        }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user workspaces' }
    }
}
