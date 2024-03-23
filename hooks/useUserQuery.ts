import { getUserAction } from '@/server/actions/user/getUser'
import { QueryClient, useQuery } from '@tanstack/react-query'

export const useUserQuery = (username: string) => {
    return useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const res = await getUserAction(username)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}

export const userQuery = (username: string, queryClient: QueryClient) => {
    return queryClient.fetchQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const res = await getUserAction(username)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
