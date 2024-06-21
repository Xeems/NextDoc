import { getUserBySessionAction } from '@/src/server/actions/user/getUserBySession'
import NewDocumentForm from './NewDocumentForm'

import { getUserWorkspacesAction } from '@/src/server/actions/workspace/getUserWorkspaces'

const CreateDocumentPage = async () => {
    const user = await getUserBySessionAction()

    if (!user) throw new Error('User not found')

    const workspaces = await getUserWorkspacesAction({
        userId: user?.id,
        teamsOnly: false,
    })

    if (!workspaces.data) throw new Error('No workspaces')

    return <NewDocumentForm workspaces={workspaces.data} />
}

export default CreateDocumentPage
