import { getDocumentsAction } from '@/server/actions/document/getDocuments'
import { useQuery } from '@tanstack/react-query'

export const useDocumentsQuery = (teamName: string) => {
    return useQuery({
        queryKey: ['documents', teamName],
        queryFn: async () => {
            const res = await getDocumentsAction(teamName)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
