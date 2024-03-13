import { getArticleByTitleAction } from '@/server/actions/article/getArticleByTitle'
import { useQuery } from '@tanstack/react-query'

type Props = {
    documentName: string
    articleTitle: string | undefined
}

export const useArticleQuery = ({ documentName, articleTitle }: Props) => {
    return useQuery({
        queryKey: ['article', documentName, articleTitle],
        queryFn: async () => {
            const res = await getArticleByTitleAction({
                documentName,
                articleTitle,
            })
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
