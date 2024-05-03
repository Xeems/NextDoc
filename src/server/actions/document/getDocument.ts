'use server'

import { getDocumentByOwnerAndName } from '@/src/server/db/document.data'

import { getUserBySessionAction } from '../user/getUserBySession'
import { getWorkspaceMemberAction } from '../workspace/getWorkspaceMember'

export const getDocumentAction = async (
    workspaceName: string,
    idName: string,
) => {
    const user = await getUserBySessionAction()

    try {
        let userRole: WorkspaceRoleType = 'NONE'
        const doc = await getDocumentByOwnerAndName(workspaceName, idName)
        if (doc?.workspace) {
            if (user?.id) {
                const res = await getWorkspaceMemberAction(
                    user?.id,
                    doc.workspace.id,
                )
                if (res.data) userRole = res.data.role
            }
        }

        return {
            data: {
                document: doc,
                role: userRole,
            },
        }
    } catch (err: unknown) {
        console.log(err)
        return { error: 'Failed to receive document' }
    }
}
