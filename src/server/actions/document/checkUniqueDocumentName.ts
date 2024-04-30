'use server'

import { z } from 'zod'

import { getDocumentByOwnerAndName } from '../../db/document.data'
import { getUserBySessionAction } from '../user/getUserBySession'

export const checkUniqueDocumentNameAction = async (documentName: string) => {
    const validationResult = await z.string().safeParseAsync(documentName)

    if (!validationResult.success) throw Error(`Validation failed`)

    const user = await getUserBySessionAction()

    try {
        const res = await getDocumentByOwnerAndName(user.username, documentName)
        if (res) {
            return { data: false }
        } else return { data: true }
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}
