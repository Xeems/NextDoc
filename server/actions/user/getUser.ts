'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getUserByUsername } from '@/server/db/user.data'
import { getServerSession } from 'next-auth/next'

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
