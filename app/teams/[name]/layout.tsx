import PageHeader from '@/components/PageHeader'
import { TeamContextProvider } from './TeamContext'
import { teamQuery } from '@/hooks/useTeamQuery'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { notFound } from 'next/navigation'
import TeamNav from './TeamNav'

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

export default async function TeamLayout({ children, params }: LayoutProps) {
    const session = await getServerSession(authOptions)
    const { data: team, error: error } = await teamQuery(
        params.name,
        session?.user.id,
    )

    if (!team) notFound()

    const role = team?.userTeams.find(
        (item) => item.userId === session?.user.id,
    )?.role

    return (
        <TeamContextProvider initial={{ TeamTole: role, teamId: team.id }}>
            <div className="flex w-full flex-col">
                <PageHeader spaceName={params.name} />
                <TeamNav links={NavLinks} basePath={`/teams/${params.name}`} />
                <div className="flex w-full items-stretch justify-center">
                    {children}
                </div>
            </div>
        </TeamContextProvider>
    )
}
