import { useSuspenseQuery } from '@tanstack/react-query'

import getQueryClient from '@/src/lib/getQueryClient'
import { getArticleByTitle } from '@/src/server/data-layer/article'

type Props = {
    documentName: string
    articleTitle: string | undefined
}

export const useArticleQuery = ({ documentName, articleTitle }: Props) => {
    return useSuspenseQuery({
        queryKey: ['article', documentName, articleTitle || 'default'],
        queryFn: async () => {
            const res = await getArticleByTitle(documentName, articleTitle)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}

export const articleQuery = ({ documentName, articleTitle }: Props) => {
    const queryClient = getQueryClient()
    return queryClient.fetchQuery({
        queryKey: ['article', documentName, articleTitle || 'default'],
        queryFn: async () => {
            const res = await getArticleByTitle(documentName, articleTitle)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
