import { authOptions } from '@/src/app/api/auth/[...nextauth]/options'
import PageHeader from '@/src/components/UI/PageHeader'
import { workspaceQuery } from '@/src/hooks/querys/useWorkspace'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

import { WorkspaceContextProvider } from './workspaceContext'
import WorkspaceNav from './WorkspaceNav'

const NavLinks = [
    {
        href: '/',
        title: 'Documents',
    },
    {
        href: 'users',
        title: 'Users',
    },
    {
        href: 'settings',
        title: 'Settings',
    },
]

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
    const session = await getServerSession(authOptions)
    const { data: workspace, error: error } = await workspaceQuery(
        params.name,
        session?.user.id,
    )

    if (!workspace) notFound()

    const role = workspace?.workspaceUsers.find(
        (item) => item.userId === session?.user.id,
    )?.role

    return (
        <WorkspaceContextProvider
            initial={{ WorkspaceRole: role, workspaceId: workspace.id }}>
            <div className="flex w-full flex-col">
                <PageHeader spaceName={params.name} />
                <WorkspaceNav
                    links={NavLinks}
                    basePath={`/workspaces/${params.name}`}
                />
                <div className="flex w-full items-stretch justify-center">
                    {children}
                </div>
            </div>
        </WorkspaceContextProvider>
    )
}
