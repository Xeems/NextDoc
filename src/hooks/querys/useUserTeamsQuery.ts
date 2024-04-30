import getQueryClient from '@/src/lib/getQueryClient'
import { getUserTeamsAction } from '@/src/server/actions/team/getUserTeams'
import { QueryClient, useQuery } from '@tanstack/react-query'

export const useUserTeamsQuery = (username: string) => {
    return useQuery({
        queryKey: ['user', username, 'teams'],
        enabled: !!username,
        queryFn: async () => {
            const res = await getUserTeamsAction(username)
            if (res.error || !res.data || !res)
                throw new Error(res.error || 'No data received')
            return res.data
        },
    })
}

export const userTeamsQuery = (username: string) => {
    const queryClient = getQueryClient()
    return queryClient.fetchQuery({
        queryKey: ['user', username, 'teams'],
        queryFn: () => getUserTeamsAction(username),
    })
}
