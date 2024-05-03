import { PlusSquareIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { CreateWorkspaceModal } from '@/src/components/UI/CreateWorkspaceModal'
import { Button } from '@/src/components/shadCn/ui/button'
import DocumentList from '@/src/components/UI/DocumentList'
import WorkspacesList from '@/src/components/UI/WorkspacesList'
import { userQuery } from '@/src/hooks/querys/useUser'
import { userWorkspacesQuery } from '@/src/hooks/querys/useUserWorkspaces'
import { workspaceDocumentsQuery } from '@/src/hooks/querys/useWorkspaceDocuments'

import ProfileCard from './ProfileCard'

type Props = {
    params: {
        username: string
    }
}
const UserPage = async ({ params }: Props) => {
    const [workspacesData, userData, documentsData] = await Promise.all([
        userWorkspacesQuery({ username: params.username }),
        userQuery(params.username),
        workspaceDocumentsQuery(params.username),
    ])

    if (!userData.user) notFound()

    if (userData.error || workspacesData.error || documentsData.error) {
        //console.log(userData, workspacesData, documentsData)

        return <></>
        //throw new Error()
    }

    const { user, isSameUser } = userData
    const { data: documents } = documentsData
    const { data: workspaces } = workspacesData

    return (
        <div className=" flex w-full flex-col gap-y-5  bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem] lg:flex-row">
            <div className="flex h-fit w-full flex-col justify-stretch p-2  lg:w-1/4">
                <ProfileCard user={user} />
                <span className="my-4 text-xl font-semibold">Workspaces</span>
                <WorkspacesList variant="popup" workspaces={workspaces} />
                {isSameUser && (
                    <CreateWorkspaceModal>
                        <Button
                            variant={'ghost'}
                            className="justify-start gap-x-2">
                            <PlusSquareIcon className="h-4 w-4" />
                            Create workspace
                        </Button>
                    </CreateWorkspaceModal>
                )}
            </div>

            <div className="flex h-fit flex-col pb-4 lg:w-3/4">
                <div className="mb-4 flex items-center justify-between">
                    <span className="m-2 text-xl font-semibold">Documents</span>
                    {isSameUser && (
                        <a href={`/new`}>
                            <Button variant={'secondary'}>
                                Create new document
                            </Button>
                        </a>
                    )}
                </div>
                {documents && (
                    <DocumentList documents={documents} withFooter={false} />
                )}
            </div>
        </div>
    )
}

export default UserPage
