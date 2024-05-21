'use server'

import {
    NewWorkspaceServerType,
    NewWorkspaceUserType,
    UserWorkspacesQueryType,
} from '@/@types/validators/workspace'
import { prisma } from '@/src/lib/prisma'

export const createWorkspace = async (data: NewWorkspaceServerType) => {
    const res = await prisma.workspace.create({
        data: {
            name: data.name,
            workspaceUsers: {
                create: {
                    userId: data.userId,
                    role: 'OWNER',
                },
            },
            workspaceType: 'TEAM',
        },
    })
    return res
}

export const getUserWorkspaces = async (data: UserWorkspacesQueryType) => {
    console.log(data)
    const res = await prisma.workspace.findMany({
        where: {
            workspaceType: data.teamsOnly ? 'TEAM' : undefined,

            workspaceUsers: {
                every: {
                    user: {
                        OR: [
                            {
                                username: data.username,
                            },
                            {
                                id: data.userId,
                            },
                        ],
                    },
                },
            },
        },
    })
    console.log(res)
    return res
}

export const getUserWorkspacesByUserId = async (userId: string) => {
    const res = await prisma.workspace.findMany({
        where: {
            workspaceUsers: {
                every: {
                    userId,
                },
            },
        },
    })
    return res
}

export const getWorkspaceMembers = async (workspaceName: string) => {
    const res = await prisma.userWorkspace.findMany({
        where: {
            workspace: {
                name: workspaceName,
            },
        },
        include: {
            user: true,
        },
    })
    return res
}

export const getWorkspaceMember = async (
    userId: string,
    workspaceId: string,
) => {
    const res = await prisma.userWorkspace.findFirst({
        where: {
            userId,
            workspace: {
                id: workspaceId,
            },
        },
    })
    return res
}

export const getWorkspace = async (workspaceName: string) => {
    const res = await prisma.workspace.findUnique({
        where: {
            name: workspaceName,
        },
        include: {
            workspaceUsers: true,
        },
    })
    return res
}

export const getWorkspaceDocuments = async (workspaceName: string) => {
    const res = await prisma.document.findMany({
        where: {
            workspace: {
                name: workspaceName,
            },
        },
        include: { workspace: true },
    })
    return res
}

export const paginationWorkspacesSearch = async (
    searchQuery: string,
    page: number,
) => {
    return await prisma.workspace.findMany({
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

export const addUserToWorkspace = async (data: NewWorkspaceUserType) => {
    const res = await prisma.userWorkspace.create({
        data: {
            workspaceId: data.workspaceId,
            userId: data.userId,
            role: data.role,
        },
    })
    return res
}

export const updateWorkspaceName = async (
    workspaceId: string,
    name: string,
) => {
    const res = await prisma.workspace.update({
        where: {
            id: workspaceId,
        },
        data: {
            name,
        },
    })
    return res
}

export const updateWorkspaceAvatar = async (
    workspaceId: string,
    url: string,
) => {
    const res = await prisma.workspace.update({
        where: {
            id: workspaceId,
        },
        data: {
            imageLink: url,
        },
    })
    return res
}
