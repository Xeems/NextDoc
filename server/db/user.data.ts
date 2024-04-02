'use server'

import { prisma } from '@/lib/prisma'

export const getUserBySessionToken = async (sessionToken: string) => {
    const user = await prisma.user.findFirst({
        where: {
            sessions: {
                some: {
                    sessionToken,
                    expires: {
                        gte: new Date(),
                    },
                },
            },
        },
    })
    return user
}

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    })
    return user
}

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
