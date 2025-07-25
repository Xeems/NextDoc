'use server'

import { NewDocumentType } from '@/@types/validators/document'
import { prisma } from '@/src/lib/prisma'
import { normalizeName } from '@/src/lib/utils'

export const createDocument = async (data: NewDocumentType) => {
    const res = await prisma.document.create({
        data: {
            urlName: normalizeName(data.documentName),
            name: data.documentName,
            description: data.documentDescription,
            documentVisability: data.documentType,
            workspaceId: data.workspaceId,
        },
    })
    return res
}

export const getDocumentById = async (documentId: string) => {
    const res = await prisma.document.findUnique({
        where: {
            id: documentId,
        },
    })
    return res
}

export const getWorkspaceDocuemnts = async (workspaceName: string) => {
    return await prisma.document.findMany({
        where: {
            workspace: {
                name: workspaceName,
            },
        },
        include: {
            workspace: true,
        },
    })
}
// SELECT d.*, w.* FROM documents d JOIN workspaces w
//ON d.workspace_id = w.id WHERE w.name = 'workspaceName';

export const getDocumentByWorkspaceNameAndName = async (
    workspaceName: string,
    urlName: string,
) => {
    const res = await prisma.document.findFirst({
        where: {
            OR: [
                {
                    workspace: {
                        name: workspaceName,
                    },

                    urlName: urlName,
                },
            ],
        },
        include: {
            workspace: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    })

    return res
}

export const getDocumentByWorkspaceIdAndName = async (
    workspaceId: string,
    documentName: string,
) => {
    return await prisma.document.findFirst({
        where: {
            workspaceId,
            name: documentName,
        },
    })
}

export const paginationDocumentsSearch = async (
    searchQuery: string,
    page: number,
    userId?: string,
) => {
    return await prisma.document.findMany({
        skip: (page - 1) * 10 || 0,
        take: 10,
        where: {
            OR: [
                {
                    ...(userId && {
                        documentVisability: 'private',
                        workspace: {
                            workspaceUsers: {
                                some: {
                                    userId: {
                                        equals: userId,
                                    },
                                },
                            },
                        },
                    }),
                },
                {
                    documentVisability: 'public',
                },
            ],
            name: {
                contains: searchQuery,
                mode: 'insensitive',
            },
        },
        include: {
            workspace: true,
        },
    })
}
