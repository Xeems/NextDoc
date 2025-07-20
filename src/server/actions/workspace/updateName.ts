'use server'

import { redirect } from 'next/navigation'

import { updateWorkspaceName } from '../../db/workspace.data'

import { getWorkspaceMemberAction } from './getWorkspaceMember'

const updateNameAction = async (workspaceId: string, name: string) => {
    try {
        const member = await getWorkspaceMemberAction(workspaceId)
        if (member?.data?.role === 'OWNER') {
            const res = await updateWorkspaceName(workspaceId, name)
            if (res.name !== name) {
                throw new Error('Failed to update name')
            }
        }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to update name' }
    } finally {
        redirect(`/workspaces/${name}/settings`)
    }
}

export default updateNameAction
