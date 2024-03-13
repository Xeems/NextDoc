'use server'

import { cookies } from 'next/headers'
import { getUserTeamsByUsername } from '@/server/db/team.data'

export const getUserTeamsAction = async (username: string) => {
    //const headers = cookies()
    //console.log(headers)
    try {
        const res = await getUserTeamsByUsername(username)
        if (!res) throw new Error('user teams db query failed')
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
