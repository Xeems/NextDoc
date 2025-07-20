import { useQuery } from '@tanstack/react-query'

import getQueryClient from '@/src/lib/getQueryClient'
import { getUserAction } from '@/src/server/actions/user/getUser'

export const useUserQuery = (username: string) => {
    return useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const res = await getUserAction(username)
            if (res.error) throw new Error(res.error)
            else return res.user
        },
    })
}

export const userQuery = (username: string) => {
    const queryClient = getQueryClient()
    return queryClient.fetchQuery({
        queryKey: ['user', username],
        queryFn: () => getUserAction(username),
    })
}
