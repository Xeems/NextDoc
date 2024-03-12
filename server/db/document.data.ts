'use server'

import { NewDocumentWithCreatorType } from '@/@types/validators/document'
import { prisma } from '@/lib/prisma'
import { normilizeName } from '@/lib/utils'

export const createDocument = async (data: NewDocumentWithCreatorType) => {
    const res = await prisma.document.create({
        data: {
            idName: normilizeName(data.documentName),
            name: data.documentName,
            description: data.documentDescription,
            type: data.documentType,
            userId: data.userId,
            teamId: data.teamId,
        },
    })
    return res
}

export const getUserDocuments = async (name: string) => {
    const res = await prisma.document.findMany({
        where: {
            OR: [{ user: { username: name } }, { team: { name: name } }],
        },
        include: {
            user: true,
        },
    })
    return res
}

export const getDocument = async (documentId: string) => {
    const res = await prisma.document.findUnique({
        where: {
            id: documentId,
        },
    })
    return res
}

export const getDocumentByOwner = async (username: string, idName: string) => {
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
                    name: true,
                    username: true,
                    image: true,
                },
            },
        },
    })

    return res
}
