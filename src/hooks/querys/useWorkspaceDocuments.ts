import getQueryClient from '@/src/lib/getQueryClient'
import { getWorkspaceDocumentsAction } from '@/src/server/actions/document/getWorksapceDocuments'
import { useQuery } from '@tanstack/react-query'

export const useWorkspaceDocumentsQuery = (username: string) => {
    return useQuery({
        queryKey: ['user', username, 'documents'],
        queryFn: async () => {
            const res = await getWorkspaceDocumentsAction(username)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}

export const workspaceDocumentsQuery = (username: string) => {
    const queryClient = getQueryClient()
    return queryClient.fetchQuery({
        queryKey: ['user', username, 'documents'],
        queryFn: () => getWorkspaceDocumentsAction(username),
    })
}
