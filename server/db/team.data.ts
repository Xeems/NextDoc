'use server'

import { newTeamServerType, newTeamUserType } from '@/@types/validators/team'
import { prisma } from '@/lib/prisma'

export const createTeam = async (data: newTeamServerType) => {
    const res = await prisma.team.create({
        data: {
            name: data.name,
            userTeams: {
                create: {
                    userId: data.userId,
                    role: 'OWNER',
                },
            },
        },
    })
    return res
}

export const createTeamDocument = async () => {
    //const res = await prisma.team.create({})
    return null
}

export const getUserTeamsByUsername = async (username: string) => {
    const res = await prisma.team.findMany({
        where: {
            userTeams: {
                every: {
                    user: {
                        username,
                    },
                },
            },
        },
    })
    //console.log(username, res)
    return res
}

export const getUserTeamsByUserId = async (userId: string) => {
    const res = await prisma.team.findMany({
        where: {
            userTeams: {
                every: {
                    userId,
                },
            },
        },
    })
    return res
}

export const getTeamMembers = async (teamName: string) => {
    const res = await prisma.userTeam.findMany({
        where: {
            team: {
                name: teamName,
            },
        },
        include: {
            user: true,
        },
    })
    return res
}

export const getTeam = async (teamName: string) => {
    const res = await prisma.team.findUnique({
        where: {
            name: teamName,
        },
        include: {
            userTeams: true,
        },
    })
    return res
}

export const getTeamDocuments = async (teamName: string) => {
    const res = await prisma.document.findMany({
        where: {
            team: {
                name: teamName,
            },
        },
        include: { user: true, team: true },
    })
    return res
}

export const addUserToTeam = async (data: newTeamUserType) => {
    const res = await prisma.userTeam.create({
        data: {
            teamId: data.teamId,
            userId: data.userId,
            role: data.role,
        },
    })
    return res
}
