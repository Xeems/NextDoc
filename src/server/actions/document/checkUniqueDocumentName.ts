'use server'

import {
    documentNameAndOwnerSchema,
    DocumentNameAndOwnerType,
} from '@/@types/validators/document'

import { getDocumentByOwnerAndName } from '../../db/document.data'
import { getUserBySessionAction } from '../user/getUserBySession'

export const checkUniqueDocumentNameAction = async (
    data: DocumentNameAndOwnerType,
) => {
    const validationResult =
        await documentNameAndOwnerSchema.safeParseAsync(data)

    if (!validationResult.success) throw Error(`Validation failed`)

    const user = await getUserBySessionAction()

    try {
        const res = await getDocumentByOwnerAndName(
            data.documentOwner.name,
            data.documentName,
        )
        if (res) {
            return { data: false }
        } else return { data: true }
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}
