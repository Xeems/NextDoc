'use server'

import { put } from '@vercel/blob/client'
import { getWorkspaceMemberAction } from './getWorkspaceMember'
import { updateWorkspaceAvatar } from '../../db/workspace.data'

export const updateAvatarAction = async (workspaceId: string, image: File) => {
    console.log(123)
    try {
        if (!workspaceId) throw Error('Workspace not found')
        const member = await getWorkspaceMemberAction(workspaceId)

        if (member?.data?.role !== 'OWNER')
            throw Error('No permission to upload avatar')

        const blob = await put(image.name, image, {
            token: `${workspaceId}${image.name}`,
            contentType: image.type,
            access: 'public',
        })

        console.log(blob)
        const { imageLink } = await updateWorkspaceAvatar(workspaceId, blob.url)
        if (!imageLink) throw Error('Failed to update avatar')

        console.log(imageLink)
        return { data: imageLink }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user workspaces' }
    }
}
