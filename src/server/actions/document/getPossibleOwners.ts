'use server'

import { getUserworkspacesWhereAdminById } from '@/src/server/db/workspace.data'

import { getUserBySessionAction } from '../user/getUserBySession'

export const getPossibleOwnersAction = async () => {
    const user = await getUserBySessionAction()
    try {
        const workspaces = await getUserworkspacesWhereAdminById(user.id)

        const res = workspaces.map((workspace) => {
            return { name: workspace.name, type: 'workspace' }
        })

        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
