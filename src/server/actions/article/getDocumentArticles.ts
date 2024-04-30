'use server'

import { getDocumentArticles } from '@/src/server/db/article.data'

export const getDocumentArticlesAction = async (documentId: string) => {
    try {
        const res = await getDocumentArticles(documentId)
        return { data: res }
    } catch (error) {
        console.error(error)
        return { error: "Can't resolve articles" }
    }
}
