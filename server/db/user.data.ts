'use server'

import { prisma } from '@/lib/prisma'

export const getUserByUsername = async (username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username,
        },
    })
    return user
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })
    return user
}
