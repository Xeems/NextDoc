'use server'

import {
    newWorkspaceServerSchema,
    NewWorkspaceServerType,
} from '@/@types/validators/workspace'
import { createWorkspace } from '@/src/server/db/workspace.data'

import { getUserBySessionAction } from '../user/getUserBySession'

export const createWorkspaceAction = async (data: NewWorkspaceServerType) => {
    const validationResult = await newWorkspaceServerSchema.safeParseAsync(data)
    const user = await getUserBySessionAction()

    if (!validationResult.success)
        throw new Error(
            `Server side validation failed ${validationResult.error.issues[0].message}`,
        )

    try {
        const res = await createWorkspace(data)
        if (res) {
            return { data: res }
        }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
