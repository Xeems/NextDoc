import { useQuery } from '@tanstack/react-query'

import { UserWorkspacesQueryType } from '@/@types/validators/workspace'
import getQueryClient from '@/src/lib/getQueryClient'
import { getUserWorkspacesAction } from '@/src/server/actions/workspace/getUserWorkspaces'

export const useUserWorkspacesQuery = (data: UserWorkspacesQueryType) => {
    return useQuery({
        queryKey: ['user', data.username, 'workspaces'],
        queryFn: async () => {
            const res = await getUserWorkspacesAction(data)
            if (res.error || !res.data || !res)
                throw new Error(res.error || 'No data received')
            return res.data
        },
    })
}

export const userWorkspacesQuery = (data: UserWorkspacesQueryType) => {
    const queryClient = getQueryClient()
    return queryClient.fetchQuery({
        queryKey: ['user', data.username, 'workspaces'],
        queryFn: () => getUserWorkspacesAction(data),
    })
}
