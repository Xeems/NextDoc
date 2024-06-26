'use server'

import {
    newDocumentSchema,
    NewDocumentType,
} from '@/@types/validators/document'
import {
    createDocument,
    getDocumentByWorkspaceIdAndName,
} from '@/src/server/db/document.data'

import { getUserBySessionAction } from '../user/getUserBySession'
import { getWorkspaceMemberAction } from '../workspace/getWorkspaceMember'

export const createDocumentAction = async (data: NewDocumentType) => {
    await newDocumentSchema.parseAsync(data)

    try {
        const document = await getDocumentByWorkspaceIdAndName(
            data.workspaceId,
            data.documentName,
        )
        if (document) throw new Error('Document already exists')

        const user = await getUserBySessionAction()
        if (!user) throw new Error('User seesion not found')

        const workspaceMember = await getWorkspaceMemberAction(data.workspaceId)

        if (
            workspaceMember?.data?.role === 'BASE' ||
            workspaceMember?.data?.role === null
        )
            throw new Error('No permission to create document')
        const res = await createDocument(data)
        if (res) return { data: res }
    } catch (error) {
        console.log(error)
        return { error: "Can't create document" }
    }
}
