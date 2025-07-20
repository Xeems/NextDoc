'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/src/app/api/auth/[...nextauth]/options'
import { getUserById } from '@/src/server/db/user.data'

export const getUserBySessionAction = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        const user = await getUserById(session?.user.id)
        return user
    } else return null
}
