'use server'

import { getUserById } from '@/server/db/user.data'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export const getUserBySessionAction = async () => {
    const session = await getServerSession(authOptions)
    const user = await getUserById(session?.user.id)
    return user
}
