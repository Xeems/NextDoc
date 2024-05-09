'use server'

import { redirect } from 'next/navigation'
import { updateWorkspaceName } from '../../db/workspace.data'
import { getWorkspaceMemberAction } from './getWorkspaceMember'

const updateNameAction = async (workspaceId: string, data: FormData) => {
    try {
        const member = await getWorkspaceMemberAction(workspaceId)
        if (member?.data?.role === 'OWNER') {
            const name = data.get('name') as string
            const res = await updateWorkspaceName(workspaceId, name)
            if (res.name === name) {
                redirect(`/workspaces/${name}/settings`)
                return res
            }
        }
    } catch (error) {
        console.error(error)
    }
    return { error: 'Something went wrong' }
}

export default updateNameAction
