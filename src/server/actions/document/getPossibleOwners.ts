'use server'

import { getUserTeamsWhereAdminById } from '@/src/server/db/team.data'

import { getUserBySessionAction } from '../user/getUserBySession'

export const getPossibleOwnersAction = async () => {
    const user = await getUserBySessionAction()
    try {
        const teams = await getUserTeamsWhereAdminById(user.id)

        const res = teams.map((team) => {
            return { name: team.name, type: 'team' }
        })
        res.push({
            name: user.username,
            type: 'y=user',
        })

        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
