import { useQuery } from '@tanstack/react-query'

import { getDocumentArticlesAction } from '@/src/server/data-layer/article'

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
