import { getUserTeamsAction } from '@/server/actions/team/getUserTeams'
import { useQuery } from '@tanstack/react-query'

export const useUserTeamsQuery = (useranme: string) => {
    return useQuery({
        queryKey: ['teams', useranme],
        queryFn: async () => {
            const res = await getUserTeamsAction(useranme)
            if (res.error || !res.data || !res)
                throw new Error(res.error || 'No data received')
            return res.data
        },
    })
}
