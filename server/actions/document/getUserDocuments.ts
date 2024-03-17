'use server'

import { getUserDocuments } from '@/server/db/document.data'

export const getUserDocumentsAction = async (username: string) => {
    try {
        const res = await getUserDocuments(username)
        if (!res) throw new Error('Failed to get documents')
        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
