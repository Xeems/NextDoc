import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import getQueryClient from '@/src/lib/getQueryClient'
import { getDocumentAction } from '@/src/server/actions/document/getDocument'

import { DocumentBreadcrumb } from './_components/Breadcrumb'
import DocumentNav from './_components/DocumentNav'
import MobileNavCollapsible from './_components/MobileNavCollapsible'

type LayoutProps = {
    children: React.ReactNode
    params: {
        name: string
        document: string
    }
}

export default async function DocLayout({ children, params }: LayoutProps) {
    const queryClient = getQueryClient()
    const { data: data, error: error } = await queryClient.fetchQuery({
        queryKey: ['document', params.name, params.document],
        queryFn: async () =>
            await getDocumentAction(params.name, params.document),
    })

    if (error || !data) throw new Error('No document')

    const state = dehydrate(queryClient)
    return (
        <HydrationBoundary state={state}>
            <div className="w-full max-w-[60rem]">
                <h1 className=" my-5 hidden text-start text-2xl font-semibold md:block">
                    {data.name}
                </h1>
                <div className="flex w-full flex-col items-start justify-center gap-x-5 md:flex-row">
                    <MobileNavCollapsible>
                        <DocumentNav
                            document={data}
                            workspaceName={params.name}
                        />
                    </MobileNavCollapsible>

                    <div className="w-full">
                        <DocumentBreadcrumb
                            ignoredSegments={['document', 'workspaces']}
                        />
                        {children}
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    )
}
