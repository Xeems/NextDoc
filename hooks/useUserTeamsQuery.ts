import { getUserTeamsAction } from '@/server/actions/team/getUserTeams'
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

export const userTeamsQuery = (username: string, queryClient: QueryClient) => {
    return queryClient.fetchQuery({
        queryKey: ['teams', username],
        queryFn: async () => {
            return await getUserTeamsAction(username)
        },
    })
}
