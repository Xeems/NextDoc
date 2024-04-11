import { getTeamDocumentsAction } from '@/server/actions/document/getTeamDocuments'
import { useQuery } from '@tanstack/react-query'

export const useTeamDocumentsQuery = (teamName: string) => {
    return useQuery({
        queryKey: ['documents', teamName],
        queryFn: async () => {
            const res = await getTeamDocumentsAction(teamName)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
