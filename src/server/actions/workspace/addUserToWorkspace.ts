'use server'

import {
    newWorkspaceUserSchema,
    NewWorkspaceUserType,
} from '@/@types/validators/workspace'
import { addUserToWorkspace } from '@/src/server/db/workspace.data'

export const addUserToWorkspaceAction = async (data: NewWorkspaceUserType) => {
    const validationResult = await newWorkspaceUserSchema.safeParseAsync(data)

    if (!validationResult.success)
        throw new Error(
            `Server side validation failed ${validationResult.error.issues[0].message}`,
        )

    try {
        const res = await addUserToWorkspace(data)
        if (res) {
            return { data: res }
        }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
