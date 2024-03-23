import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query'
import { getUserDocumentsAction } from '@/server/actions/document/getUserDocuments'
import { getUserAction } from '@/server/actions/user/getUser'
import { getUserTeamsAction } from '@/server/actions/team/getUserTeams'
import getQueryClient from '@/lib/getQueryClient'

type LayoutProps = {
    children: React.ReactNode
    params: {
        username: string
    }
}

export default async function TeamLayout({ children, params }: LayoutProps) {
    const queryClient = getQueryClient()

    queryClient.fetchQuery({
        queryKey: ['user', params.username, 'teams'],
        queryFn: async () => {
            return await getUserTeamsAction(params.username)
        },
    })
    await queryClient.fetchQuery({
        queryKey: ['user', params.username],
        queryFn: async () => {
            return await getUserAction(params.username)
        },
    })
    queryClient.fetchQuery({
        queryKey: ['user', params.username, 'documents'],
        queryFn: async () => {
            return await getUserDocumentsAction(params.username)
        },
    })

    const state = dehydrate(queryClient)

    return (
        <>
            <HydrationBoundary state={state}>{children}</HydrationBoundary>
        </>
    )
}
