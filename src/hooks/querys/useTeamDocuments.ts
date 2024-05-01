import { getWorkspaceDocumentsAction } from '@/src/server/actions/document/getWorksapceDocuments'
import { useQuery } from '@tanstack/react-query'

export const useTeamDocumentsQuery = (teamName: string) => {
    return useQuery({
        queryKey: ['documents', teamName],
        queryFn: async () => {
            const res = await getWorkspaceDocumentsAction(teamName)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
