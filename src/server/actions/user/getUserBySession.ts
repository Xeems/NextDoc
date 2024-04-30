'use server'

import { authOptions } from '@/src/app/api/auth/[...nextauth]/options'
import { getUserById } from '@/src/server/db/user.data'
import { getServerSession } from 'next-auth/next'

export const getUserBySessionAction = async () => {
    const session = await getServerSession(authOptions)
    const user = await getUserById(session?.user.id)
    return user
}
