'use server'

import { newArticleSchema, newArticleType } from '@/@types/validators/article'
import { createArticle, getArticleByTitle } from '@/server/db/article.data'

export const createArticleAction = async (
    article: newArticleType,
    documentId: string,
) => {
    const validationResult = await newArticleSchema.safeParseAsync(article)
    if (!validationResult.success) return { error: 'Validation failed' }

    const sameNameArticle = await getArticleByTitle(article.title, documentId)
    if (sameNameArticle)
        return {
            error: 'An article with the same title already exists in the document',
        }

    try {
        const res = await createArticle(article, documentId)
        return { data: res }
    } catch (error) {
        console.error(error)
        return { error: 'Something went wrong' }
    }
}
