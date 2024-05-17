import getQueryClient from '@/src/lib/getQueryClient'
import { getDocumentAction } from '@/src/server/actions/document/getDocument'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import DocumentNav from './_components/DocumentNav'
import MobileNavDrawer from './_components/MobileNavDrawer'
import { DocumentBreadcrumb } from './_components/Breadcrumb'

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

    if (error || !data?.document) throw new Error('No document')

    const state = dehydrate(queryClient)
    return (
        <HydrationBoundary state={state}>
            <div className="w-full max-w-[60rem] px-2 ">
                <h1 className=" my-5 hidden text-start text-2xl font-semibold md:block">
                    {data.document?.name}
                </h1>
                <div className="flex w-full flex-col items-start justify-center gap-x-5 md:flex-row">
                    <MobileNavDrawer>
                        <DocumentNav document={data.document} />
                    </MobileNavDrawer>

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
