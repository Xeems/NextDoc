import { getUserDocumentsAction } from '@/server/actions/document/getUserDocuments'
import { QueryClient, useQuery } from '@tanstack/react-query'

export const useUserDocumentsQuery = (username: string) => {
    return useQuery({
        queryKey: ['user', username, 'documents'],
        queryFn: async () => {
            const res = await getUserDocumentsAction(username)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}

export const userDocumentsQuery = (
    username: string,
    queryClient: QueryClient,
) => {
    return queryClient.fetchQuery({
        queryKey: ['documents', username],
        queryFn: async () => {
            return await getUserDocumentsAction(username)
        },
    })
}
