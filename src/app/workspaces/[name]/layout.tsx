import { notFound } from 'next/navigation'

import { workspaceQuery } from '@/src/hooks/querys/useWorkspace'

import { WorkspaceContextProvider } from './WorkspaceContext'
import WorkspaceNav from './WorkspaceNav'
import { Separator } from '@/src/components/shadCn/ui/separator'
import { Suspense, cache } from 'react'
import Loading from './loading'
import getQueryClient from '@/src/lib/getQueryClient'
import { getWorkspaceAction } from '@/src/server/actions/workspace/getWorkspace'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

type LayoutProps = {
    children: React.ReactNode
    params: {
        name: string
    }
}

export default async function WorkspaceLayout({
    children,
    params,
}: LayoutProps) {
    const queryClient = getQueryClient()
    const { data, error } = await queryClient.fetchQuery({
        queryKey: ['workspace', params.name],
        queryFn: async () => {
            return await getWorkspaceAction(params.name)
        },
    })

    if (!data || error) notFound()

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WorkspaceContextProvider
                initial={{
                    workspaceRole: data.userRole,
                    workspaceId: data?.workspace.id,
                }}>
                <div className="flex w-full flex-col">
                    {data.userRole !== 'NONE' ||
                    data.workspace.workspaceType == 'USER' ? (
                        <WorkspaceNav basePath={`/workspaces/${params.name}`} />
                    ) : (
                        <Separator />
                    )}

                    <div className="flex w-full items-stretch justify-center">
                        <Suspense fallback={<Loading />}>{children}</Suspense>
                    </div>
                </div>
            </WorkspaceContextProvider>
        </HydrationBoundary>
    )
}
