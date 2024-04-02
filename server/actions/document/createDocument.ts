'use server'

import { createDocument } from '@/server/db/document.data'
import {
    NewDocumentType,
    newDocumentSchema,
} from '@/@types/validators/document'
import { getUserBySessionAction } from '../user/getUserBySessionToken'

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
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
