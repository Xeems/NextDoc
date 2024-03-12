import { getDocumentArticlesAction } from '@/server/actions/article/getDocumentArticles'
import { useQuery } from '@tanstack/react-query'

export const useArticlesQuery = (documentId: string) => {
    return useQuery({
        queryKey: ['articles', documentId],
        queryFn: async () => {
            const res = await getDocumentArticlesAction(documentId)
            if (res.error) throw new Error(res.error)
            return res.data
        },
    })
}
