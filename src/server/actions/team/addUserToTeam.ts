'use server'

import { newTeamUserSchema, newTeamUserType } from '@/@types/validators/team'
import { addUserToTeam } from '@/src/server/db/team.data'

export const addUserToTeamAction = async (data: newTeamUserType) => {
    const validationResult = await newTeamUserSchema.safeParseAsync(data)

    if (!validationResult.success)
        throw new Error(
            `Server side validation failed ${validationResult.error.issues[0].message}`,
        )

    try {
        const res = await addUserToTeam(data)
        if (res) {
            return { data: res }
        }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
