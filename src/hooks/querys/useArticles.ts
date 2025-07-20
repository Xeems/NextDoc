import { useQuery } from '@tanstack/react-query'

import { getDocumentArticlesQuery } from '@/src/server/data-layer/article'

export const useArticlesQuery = (documentId: string) => {
    return useQuery({
        queryKey: ['articles', documentId],
        queryFn: async () => {
            const res = await getDocumentArticlesQuery(documentId)
            if (res.error) throw new Error(res.error)
            return res.data
        },
    })
}
