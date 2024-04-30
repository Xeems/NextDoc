import { getTeamMembersAction } from '@/src/server/actions/team/getTeamMembers'
import { QueryClient } from '@tanstack/react-query'

import UsersTable from './UsersTable'
import { UserTableColumns } from './UserTableColumns'

type Props = {
    params: {
        name: string
    }
}

export default async function UsersPage({ params }: Props) {
    const queryClient = new QueryClient()
    const { data, error } = await queryClient.fetchQuery({
        queryKey: [params.name, 'teamUsers'],
        queryFn: async () => {
            return await getTeamMembersAction(params.name)
        },
    })

    return (
        <div className="flex w-full flex-col items-center gap-y-5 bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem]">
            <UsersTable
                data={data!}
                //@ts-ignore
                columns={UserTableColumns}
            />
        </div>
    )
}
