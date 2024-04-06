import Loading from '@/app/document/loading'
import getQueryClient from '@/lib/getQueryClient'
import { getDocumentAction } from '@/server/actions/document/getDocument'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

import { DocumentContextProvider } from './[[...slug]]/DocumentContext'
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
    if (error || !data?.doc) return <p>Some Error</p>

    const state = dehydrate(queryClient)
    return (
        <DocumentContextProvider
            initial={{
                userRole: data.userRole,
            }}>
            <HydrationBoundary state={state}>
                <div className="flex w-fit flex-col gap-y-5">
                    <h1 className="mt-10 text-start text-4xl font-semibold">
                        {data.doc.name}
                    </h1>
                    <div className="flex w-full items-start justify-center">
                        <DocumentNav document={data.doc!} />
                        {children}
                    </div>
                </div>
            </HydrationBoundary>
        </DocumentContextProvider>
    )
}
