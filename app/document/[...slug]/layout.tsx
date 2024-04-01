import DocumentNav from './DocumentNav'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getDocumentAction } from '@/server/actions/document/getDocument'
import { Suspense } from 'react'
import getQueryClient from '@/lib/getQueryClient'
import { DocumentContextProvider } from './DocumentContext'

type LayoutProps = {
    children: React.ReactNode
    params: {
        slug: string[]
    }
}

export default async function DocLayout({ children, params }: LayoutProps) {
    const queryClient = getQueryClient()
    const { data: data, error: error } = await queryClient.fetchQuery({
        queryKey: ['document', params.slug[0], params.slug[1]],
        queryFn: async () =>
            await getDocumentAction(params.slug[0], params.slug[1]),
    })
    if (error || !data?.doc) return <p>Some Error</p>

    const state = dehydrate(queryClient)
    return (
        <DocumentContextProvider
            initial={{
                userRole: data.userRole,
            }}>
            <HydrationBoundary state={state}>
                <div className="flex w-full flex-col">
                    <div className="flex w-full items-start justify-center py-5">
                        <DocumentNav document={data.doc!} />
                        <Suspense fallback={<div>Loading</div>}>
                            {children}
                        </Suspense>
                    </div>
                </div>
            </HydrationBoundary>
        </DocumentContextProvider>
    )
}
