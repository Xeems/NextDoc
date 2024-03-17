import { getUserDocumentsAction } from '@/server/actions/document/getUserDocuments'
import { useQuery } from '@tanstack/react-query'

export const useUserDocumentsQuery = (username: string) => {
    return useQuery({
        queryKey: ['documents', username],
        queryFn: async () => {
            const res = await getUserDocumentsAction(username)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
