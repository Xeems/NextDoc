import {
    getArticleByDocumentUrlAndTitle,
    getDocumentArticles,
    getFirstArticle,
} from '../db/article.data'

export const getArticleByTitle = async (
    documentName: string,
    articleTitle: string | undefined,
) => {
    try {
        if (!articleTitle) {
            const res = await getFirstArticle(documentName)
            return { data: res }
        } else {
            const res = await getArticleByDocumentUrlAndTitle(
                documentName,
                articleTitle,
            )
            return { data: res }
        }
    } catch (error) {
        console.error(error)
        return { error: 'Could not get article' }
    }
}

export const getDocumentArticlesQuery = async (documentId: string) => {
    try {
        const res = await getDocumentArticles(documentId)
        return { data: res }
    } catch (error) {
        console.error(error)
        return { error: "Can't resolve articles" }
    }
}
