import getQueryClient from '@/src/lib/getQueryClient'
import { getDocumentAction } from '@/src/server/actions/document/getDocument'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import DocumentNav from './DocumentNav'

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
            <div className="flex w-fit flex-col gap-y-5">
                <h1 className="mt-10 text-start text-4xl font-semibold">
                    {data.document?.name}
                </h1>
                <div className="flex w-full items-start justify-center">
                    <DocumentNav document={data.document} />
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    )
}
