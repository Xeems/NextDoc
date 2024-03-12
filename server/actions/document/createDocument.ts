'use server'

import { createDocument } from '@/server/db/document.data'
import {
    NewDocumentWithCreatorType,
    newDocWithCreatorSchema,
} from '@/@types/validators/document'

export const createDocumentAction = async (
    data: NewDocumentWithCreatorType,
) => {
    const validationResult = await newDocWithCreatorSchema.safeParseAsync(data)

    if (!validationResult.success)
        return {
            error: `Validation failed ${validationResult.error.issues[0].message}`,
        }

    try {
        const res = await createDocument(data)
        if (res) {
            return { data: res }
        }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
