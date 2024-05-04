import { useQuery } from '@tanstack/react-query'

import getQueryClient from '@/src/lib/getQueryClient'
import { getWorkspaceAction } from '@/src/server/actions/workspace/getWorkspace'

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
    const queryClient = getQueryClient()
    return queryClient.fetchQuery({
        queryKey: ['workspace', workspaceName],
        queryFn: async () => {
            return await getWorkspaceAction(workspaceName)
        },
    })
}
