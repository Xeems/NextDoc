'use server'

import {
    newWorkspaceServerType,
    newWorkspaceUserType,
} from '@/@types/validators/workspace'
import { prisma } from '@/src/lib/prisma'

export const createWorkspace = async (data: newWorkspaceServerType) => {
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

export const getUserWorkspaces = async (username: string) => {
    const res = await prisma.workspace.findMany({
        where: {
            workspaceType: 'TEAM',
            workspaceUsers: {
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

export const getUserworkspacesWhereAdminById = async (userId: string) => {
    const res = await prisma.workspace.findMany({
        where: {
            workspaceUsers: {
                every: {
                    userId,
                    role: 'OWNER' || 'ADMIN',
                },
            },
            NOT: {
                workspaceType: 'USER',
            },
        },
    })
    return res
}

export const getworkspaceMembers = async (workspaceName: string) => {
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

export const getworkspaceMember = async (
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
        select: {
            role: true,
        },
    })
    return res
}

export const getworkspace = async (workspaceName: string) => {
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

export const addUserToWorkspace = async (data: newWorkspaceUserType) => {
    const res = await prisma.userWorkspace.create({
        data: {
            workspaceId: data.workspaceId,
            userId: data.userId,
            role: data.role,
        },
    })
    return res
}
