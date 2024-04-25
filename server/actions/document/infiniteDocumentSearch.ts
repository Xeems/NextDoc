'use server'

import { infiniteDocumentsSearch } from '@/server/db/document.data'

export const infiniteDocumentSearchAction = async (
    searchQuery: string,
    page: number,
) => {
    try {
        const res = await infiniteDocumentsSearch(searchQuery, page)
        if (!res) throw new Error('Failed to get documents')
        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
