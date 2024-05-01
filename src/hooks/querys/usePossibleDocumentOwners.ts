import { getPossibleOwnersAction } from '@/src/server/actions/document/getPossibleOwners'
import { useQuery } from '@tanstack/react-query'

export const usePossibleDocumentOwnersQuery = () => {
    return useQuery({
        queryKey: ['documentOwner'],
        queryFn: async () => {
            const res = await getPossibleOwnersAction()
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })
}
