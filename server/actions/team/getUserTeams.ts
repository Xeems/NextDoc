'use server'

import { cookies } from 'next/headers'
import { getUserTeamsByUsername } from '@/server/db/team.data'
import { getUserBySessionToken } from '@/server/db/user.data'

export const getUserTeamsAction = async (username: string) => {
    const headers = cookies()
    const sessionToken = headers.get('next-auth.session-token')?.value

    ///to-do server side user validation
    const user = await getUserBySessionToken(sessionToken!)

    try {
        const res = await getUserTeamsByUsername(username)
        if (!res) throw new Error('user teams db query failed')
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Failed to get user teams' }
    }
}
