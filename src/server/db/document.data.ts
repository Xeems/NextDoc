'use server'

import { NewDocumentWithCreatorType } from '@/@types/validators/document'
import { prisma } from '@/src/lib/prisma'
import { normalizeName } from '@/src/lib/utils'

export const createDocument = async (data: NewDocumentWithCreatorType) => {
    const res = await prisma.document.create({
        data: {
            idName: normalizeName(data.documentName),
            name: data.documentName,
            description: data.documentDescription,
            type: data.documentType,
            userId: data.userId,
            teamId: data.teamId,
        },
    })
    return res
}

export const getUserDocuments = async (name: string, userId?: string) => {
    const res = await prisma.document.findMany({
        where: {
            user: { username: name },
            team: null,
            OR: [
                {
                    user: { id: userId },
                },
                {
                    type: 'public',
                },
            ],
        },
        include: {
            user: {
                select: {
                    username: true,
                    id: true,
                    name: true,
                    image: true,
                },
            },
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

export const getDocumentByOwnerAndName = async (
    username: string,
    idName: string,
) => {
    const res = await prisma.document.findFirst({
        where: {
            OR: [
                {
                    user: {
                        username: username,
                    },
                },
                {
                    team: {
                        name: username,
                    },
                },
            ],

            idName: idName,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                },
            },
            team: {
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
            team: true,
            user: true,
        },
    })
}