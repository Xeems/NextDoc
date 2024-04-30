'use server'

import { newTeamServerType, newTeamUserType } from '@/@types/validators/team'
import { prisma } from '@/src/lib/prisma'

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

export const getTeamMember = async (userId: string, teamId: string) => {
    const res = await prisma.userTeam.findFirst({
        where: {
            userId,
            team: {
                id: teamId,
            },
        },
        select: {
            role: true,
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

export const paginationTeamsSearch = async (
    searchQuery: string,
    page: number,
) => {
    return await prisma.team.findMany({
        take: 10,
        skip: (page - 1) * 10 || 0,

        where: {
            name: {
                contains: searchQuery,
                mode: 'insensitive',
            },
        },
    })
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
