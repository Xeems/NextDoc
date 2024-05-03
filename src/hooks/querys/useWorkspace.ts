import { getWorkspaceAction } from '@/src/server/actions/workspace/getWorkspace'
import { QueryClient, useQuery } from '@tanstack/react-query'

export const useWorkspaceQuery = (workspaceName: string) => {
    return useQuery({
        queryKey: ['workspace', workspaceName],
        queryFn: async () => {
            const res = await getWorkspaceAction(workspaceName)
            if (res.error || !res.data || !res)
                throw new Error(res.error || 'No data received')
            return res.data
        },
    })
}

export const workspaceQuery = (workspaceName: string) => {
    const queryClient = new QueryClient()
    return queryClient.fetchQuery({
        queryKey: ['workspace', workspaceName],
        queryFn: async () => {
            return await getWorkspaceAction(workspaceName)
        },
    })
}
