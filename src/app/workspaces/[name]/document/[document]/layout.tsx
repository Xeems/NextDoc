import getQueryClient from '@/src/lib/getQueryClient'
import { getDocumentAction } from '@/src/server/actions/document/getDocument'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import DocumentNav from './DocumentNav'
import NavMobileDrawer from './NavMobileDrawer'

type LayoutProps = {
    children: React.ReactNode
    params: {
        owner: string
        document: string
    }
}

export default async function DocLayout({ children, params }: LayoutProps) {
    const queryClient = getQueryClient()
    const { data: data, error: error } = await queryClient.fetchQuery({
        queryKey: ['document', params.owner, params.document],
        queryFn: async () =>
            await getDocumentAction(params.owner, params.document),
    })

    if (error || !data?.document) throw new Error('No document')

    const state = dehydrate(queryClient)
    return (
        <HydrationBoundary state={state}>
            <div className="w-full max-w-[60rem] px-2 ">
                <h1 className="my-5 text-start text-4xl font-semibold">
                    {data.document?.name}
                </h1>
                <div className="flex w-full flex-col items-start justify-center gap-x-5 md:flex-row">
                    <NavMobileDrawer>
                        <DocumentNav document={data.document} />
                    </NavMobileDrawer>
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    )
}
