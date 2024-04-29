import getQueryClient from '@/lib/getQueryClient'
import { getUserDocumentsAction } from '@/server/actions/document/getUserDocuments'
import { useQuery } from '@tanstack/react-query'

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

export const userDocumentsQuery = (username: string) => {
    const queryClient = getQueryClient()
    return queryClient.fetchQuery({
        queryKey: ['user', username, 'documents'],
        queryFn: () => getUserDocumentsAction(username),
    })
}
