'use server'

import { getDocumentByWorkspaceNameAndName } from '@/src/server/db/document.data'

export const getDocumentAction = async (
    workspaceName: string,
    idName: string,
) => {
    try {
        const doc = await getDocumentByWorkspaceNameAndName(
            workspaceName,
            idName,
        )

        return { data: doc }
    } catch (err: unknown) {
        console.log(err)
        return { error: 'Failed to receive document' }
    }
}
