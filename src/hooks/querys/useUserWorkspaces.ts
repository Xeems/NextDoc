import getQueryClient from '@/src/lib/getQueryClient'
import { getUserWorkspacesAction } from '@/src/server/actions/workspace/getUserWorkspaces'
import { QueryClient, useQuery } from '@tanstack/react-query'

export const useUserWorkspacesQuery = (username: string) => {
    return useQuery({
        queryKey: ['user', username, 'workspaces'],
        enabled: !!username,
        queryFn: async () => {
            const res = await getUserWorkspacesAction(username)
            if (res.error || !res.data || !res)
                throw new Error(res.error || 'No data received')
            return res.data
        },
    })
}

export const userWorkspacesQuery = (username: string) => {
    const queryClient = getQueryClient()
    return queryClient.fetchQuery({
        queryKey: ['user', username, 'workspaces'],
        queryFn: () => getUserWorkspacesAction(username),
    })
}
