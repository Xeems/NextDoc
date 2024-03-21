'use server'

import { getUserBySessionToken } from '@/server/db/user.data'
import { cookies } from 'next/headers'

export const getUserBySessionTokenAction = async () => {
    const sessionToken = cookies().get('next-auth.session-token')?.value
    if (!sessionToken) throw Error('no session token')
    const user = getUserBySessionToken(sessionToken)
    return user
}
