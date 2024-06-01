import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { notFound, redirect } from 'next/navigation'

import getQueryClient from '@/src/lib/getQueryClient'
import { ROUTES } from '@/src/lib/routes'
import { getWorkspaceAction } from '@/src/server/actions/workspace/getWorkspace'

import { WorkspaceContextProvider } from './_components/WorkspaceContext'
import WorkspaceNav from './_components/WorkspaceNav'
import Loading from './loading'

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

    if (data.userRole !== 'OWNER' && data.workspace.workspaceType === 'USER') {
        redirect(ROUTES.USER(data.workspace.name))
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WorkspaceContextProvider
                initial={{
                    workspaceRole: data.userRole,
                    workspaceId: data.workspace.id,
                }}>
                <div className="flex w-full flex-col">
                    {data.userRole !== 'NONE' &&
                        data.workspace.workspaceType === 'TEAM' && (
                            <WorkspaceNav
                                basePath={ROUTES.WORKSPACE(params.name)}
                            />
                        )}

                    <div className="flex w-full items-stretch justify-center">
                        <Suspense fallback={<Loading />}>{children}</Suspense>
                    </div>
                </div>
            </WorkspaceContextProvider>
        </HydrationBoundary>
    )
}
