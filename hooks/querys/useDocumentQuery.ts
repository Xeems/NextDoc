import { getDocumentAction } from '@/server/actions/document/getDocument'
import { useQuery } from '@tanstack/react-query'

export const useDocumentQuery = (ownerName: string, documentName: string) => {
    return useQuery({
        queryKey: ['document', ownerName, documentName],
        queryFn: async () => {
            const res = await getDocumentAction(ownerName, documentName)
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
