import { QueryClient } from '@tanstack/react-query'

import { getWorkspaceMembersAction } from '@/src/server/actions/workspace/getWorkspaceMembers'

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
        queryKey: [params.name, 'workspaceUsers'],
        queryFn: async () => {
            return await getWorkspaceMembersAction(params.name)
        },
    })

    return (
        <div className="flex w-full flex-col items-center gap-y-5 bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem]">
            <UsersTable
                //@ts-ignore
                data={data!}
                //@ts-ignore
                columns={UserTableColumns}
            />
        </div>
    )
}
