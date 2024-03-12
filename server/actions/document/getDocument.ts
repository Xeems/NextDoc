'use server'

import { getDocumentByOwner } from '@/server/db/document.data'

export const getDocumentAction = async (username: string, idName: string) => {
    try {
        const res = await getDocumentByOwner(username, idName)
        if (!res || res === null) throw new Error('Failed to receive document')
        return { data: res }
    } catch (err: unknown) {
        console.log(err)
        return { error: 'Failed to receive document' }
    }
}
