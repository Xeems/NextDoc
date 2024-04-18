import { articleQuery } from '@/hooks/querys/useArticleQuery'
import { notFound } from 'next/navigation'
import React from 'react'

import ArticleEditForm from './ArticleEditForm'

type Props = {
    params: {
        owner: string
        document: string
        slug: string[]
    }
}

export default async function DocumentPage({ params }: Props) {
    if (params.slug == undefined) notFound()

    const article = await articleQuery({
        documentName: params.document,
        articleTitle: params.slug.slice(-1)[0],
    })

    if (!article) notFound()

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-initial flex-row items-start justify-stretch gap-7 p-3 text-start w-[700px]">
                <ArticleEditForm article={article} />
            </div>
        </div>
    )
}
