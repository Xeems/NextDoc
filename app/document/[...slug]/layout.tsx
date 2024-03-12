import DocumentNav from './DocumentNav'
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query'
import { getDocumentAction } from '@/server/actions/document/getDocument'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type LayoutProps = {
    children: React.ReactNode
    params: {
        slug: string[]
    }
}

export default async function DocLayout({ children, params }: LayoutProps) {
    const queryClient = new QueryClient()
    const { data: data, error: error } = await queryClient.fetchQuery({
        queryKey: ['document', params.slug[0], params.slug[1]],
        queryFn: () => getDocumentAction(params.slug[0], params.slug[1]),
    })
    if (error || !data) notFound()

    const state = dehydrate(queryClient)
    return (
        <HydrationBoundary state={state}>
            <div className="flex w-full flex-col">
                <div className="flex w-full items-start justify-center py-5">
                    <DocumentNav
                        //@ts-ignore
                        document={data}
                    />
                    <Suspense fallback={<div>Loading</div>}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </HydrationBoundary>
    )
}
