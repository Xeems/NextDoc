'use server'

import { getDocumentArticles } from '@/server/db/article.data'

export const getDocumentArticlesAction = async (documentId: string) => {
    try {
        const res = await getDocumentArticles(documentId)
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: "Can't resolve articles" }
    }
}
