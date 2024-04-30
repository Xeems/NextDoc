'use server'

import {
    newTeamServerSchema,
    newTeamServerType,
} from '@/@types/validators/team'
import { createTeam } from '@/src/server/db/team.data'

export const createTeamAction = async (data: newTeamServerType) => {
    const validationResult = await newTeamServerSchema.safeParseAsync(data)

    if (!validationResult.success)
        throw new Error(
            `Server side validation failed ${validationResult.error.issues[0].message}`,
        )

    try {
        const res = await createTeam(data)
        if (res) {
            return { data: res }
        }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
