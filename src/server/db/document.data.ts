'use server'

import { NewDocumentType } from '@/@types/validators/document'
import { prisma } from '@/src/lib/prisma'
import { normalizeName } from '@/src/lib/utils'

export const createDocument = async (data: NewDocumentType) => {
    const res = await prisma.document.create({
        data: {
            idName: normalizeName(data.documentName),
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
    const res = await prisma.document.findMany({
        where: {
            workspace: {
                name: workspaceName,
            },
        },
    })

    return res
}

export const getDocumentByOwnerAndName = async (
    workspaceName: string,
    idName: string,
) => {
    const res = await prisma.document.findFirst({
        where: {
            workspace: {
                name: workspaceName,
            },

            idName: idName,
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

export const paginationDocumentsSearch = async (
    searchQuery: string,
    page: number,
) => {
    return await prisma.document.findMany({
        skip: (page - 1) * 10 || 0,
        take: 10,
        where: {
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
