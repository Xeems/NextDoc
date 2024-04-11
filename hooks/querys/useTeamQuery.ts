import { getTeamAction } from '@/server/actions/team/getTeam'
import { QueryClient, useQuery } from '@tanstack/react-query'

export const useTeamQuery = (teamName: string, userId: string) => {
    return useQuery({
        queryKey: ['team', teamName],
        queryFn: async () => {
            const res = await getTeamAction({ teamName, userId })
            if (res.error || !res.data || !res)
                throw new Error(res.error || 'No data received')
            return res.data
        },
    })
}

export const teamQuery = (teamName: string, userId: string) => {
    const queryClient = new QueryClient()
    return queryClient.fetchQuery({
        queryKey: ['team', teamName],
        queryFn: async () => {
            return await getTeamAction({ teamName, userId })
        },
    })
}
