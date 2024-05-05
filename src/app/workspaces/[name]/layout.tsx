import { notFound } from 'next/navigation'

import { workspaceQuery } from '@/src/hooks/querys/useWorkspace'

import { WorkspaceContextProvider } from './WorkspaceContext'
import WorkspaceNav from './WorkspaceNav'
import { Separator } from '@/src/components/shadCn/ui/separator'

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
    const { data, error: error } = await workspaceQuery(params.name)

    if (!data) notFound()

    return (
        <WorkspaceContextProvider
            initial={{
                WorkspaceRole: data.userRole,
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
                    {children}
                </div>
            </div>
        </WorkspaceContextProvider>
    )
}
