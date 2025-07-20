'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/src/app/api/auth/[...nextauth]/options'
import { getUserByUsername } from '@/src/server/db/user.data'

export const getUserAction = async (username: string) => {
    const session = await getServerSession(authOptions)
    try {
        const user = await getUserByUsername(username)
        let isSameUser: boolean = false
        if (user?.id == session?.user.id) isSameUser = true

        return { user, isSameUser }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
