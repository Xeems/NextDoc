import { notFound } from 'next/navigation'

import { workspaceQuery } from '@/src/hooks/querys/useWorkspace'

import { WorkspaceContextProvider } from './WorkspaceContext'
import WorkspaceNav from './WorkspaceNav'
import { Separator } from '@/src/components/shadCn/ui/separator'
import { Suspense, cache } from 'react'
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
    const { data, error } = await workspaceQuery(params.name)

    if (!data || error) notFound()

    return (
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
    )
}
