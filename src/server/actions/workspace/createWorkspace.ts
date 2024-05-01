'use server'

import {
    newWorkspaceServerSchema,
    newWorkspaceServerType,
} from '@/@types/validators/workspace'
import { createWorkspace } from '@/src/server/db/workspace.data'

export const createWorkspaceAction = async (data: newWorkspaceServerType) => {
    const validationResult = await newWorkspaceServerSchema.safeParseAsync(data)

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
