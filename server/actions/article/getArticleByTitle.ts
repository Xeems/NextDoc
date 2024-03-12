'use server'

import { getArticleByTitle, getFirstArticle } from '@/server/db/article.data'

type Props = {
    documentName: string
    articleTitle: string | undefined
}
export const getArticleByTitleAction = async ({
    documentName,
    articleTitle,
}: Props) => {
    try {
        if (!articleTitle) {
            const res = await getFirstArticle(documentName)
            return { data: res }
        } else {
            const res = await getArticleByTitle(documentName, articleTitle)
            return { data: res }
        }
        throw new Error()
    } catch (error) {
        console.log(error)
        return { error: 'Could not get article' }
    }
}
