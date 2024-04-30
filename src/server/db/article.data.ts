'use server'

import { newArticleType } from '@/@types/validators/article'
import { prisma } from '@/src/lib/prisma'
import { normilizeName } from '@/src/lib/utils'

export const createArticle = async (
    article: newArticleType,
    documentId: string,
) => {
    const res = await prisma.article.create({
        data: {
            title: article.title,
            idTitle: normilizeName(article.title),
            documentId: documentId,
            parentId: article.parentArticleId as string,
        },
    })
    return res
}

export const getFirstArticle = async (documentName: string) => {
    return await prisma.article.findFirst({
        where: {
            document: {
                idName: documentName,
            },
        },
    })
}

export const getArticleByTitle = async (
    documentName: string,
    articleTitle: string,
) => {
    const res = await prisma.article.findFirst({
        where: {
            document: {
                idName: documentName,
            },
            idTitle: articleTitle,
        },
    })
    return res
}

export const getDocumentArticles = async (documentId: string) => {
    const res = await prisma.article.findMany({
        where: {
            documentId,
            parentId: null,
        },
        select: {
            id: true,
            title: true,
            idTitle: true,
            documentId: true,
            childs: {
                select: {
                    id: true,
                    title: true,
                    idTitle: true,
                    documentId: true,
                    parentId: true,
                },
            },
        },
    })
    return res
}

export const updateAricleContent = async (
    articleId: string,
    content: string,
) => {
    const res = await prisma.article.update({
        where: {
            id: articleId,
        },
        data: {
            content: content,
        },
    })
    return res
}
