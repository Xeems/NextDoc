'use server'

import {
    newDocumentSchema,
    NewDocumentType,
} from '@/@types/validators/document'
import { createDocument } from '@/src/server/db/document.data'

import { getUserBySessionAction } from '../user/getUserBySession'
import { getWorkspaceMemberAction } from '../workspace/validateWorkspaceMember'

export const createDocumentAction = async (data: NewDocumentType) => {
    const validationResult = await newDocumentSchema.safeParseAsync(data)

    if (!validationResult.success)
        throw Error(
            `Validation failed ${validationResult.error.issues[0].message}`,
        )

    try {
        const user = await getUserBySessionAction()
        const workspaceMember = await getWorkspaceMemberAction(
            user.id,
            data.workspaceId,
        )
        if (
            workspaceMember.data?.role === 'OWNER' ||
            workspaceMember.data?.role === 'ADMIN'
        ) {
            const res = await createDocument(data, user.id)
            console.log(res)
            if (res) return { data: res }
        }
    } catch (error) {
        console.log(error)
        return { error: "Can't create document" }
    }
}
