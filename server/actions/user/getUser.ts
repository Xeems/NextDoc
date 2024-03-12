'use server'

import { getUserByUsername } from '@/server/db/user.data'

export const getUser = async (usernameOrEmail: string) => {
    try {
        const response = await getUserByUsername(usernameOrEmail)
        return { data: response }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
