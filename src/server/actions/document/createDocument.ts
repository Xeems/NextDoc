'use server'

import {
    newDocumentSchema,
    NewDocumentType,
} from '@/@types/validators/document'
import { createDocument } from '@/src/server/db/document.data'

import { getUserBySessionAction } from '../user/getUserBySession'

type Props = {
    data: NewDocumentType
}
export const createDocumentAction = async ({ data }: Props) => {
    const validationResult = await newDocumentSchema.safeParseAsync(data)

    if (!validationResult.success)
        throw Error(
            `Validation failed ${validationResult.error.issues[0].message}`,
        )

    const user = await getUserBySessionAction()
    if (!user) throw Error('No user session')

    const dataWithCreator = {
        ...data,
        userId: user.id,
    }

    try {
        const res = await createDocument(dataWithCreator)
        if (res) {
            return { data: res }
        }
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}