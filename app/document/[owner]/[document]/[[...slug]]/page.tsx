import { articleQuery } from '@/hooks/querys/useArticleQuery'
import React from 'react'

import ArticleEditForm from './ArticleEditForm'

type Props = {
    params: {
        owner: string
        document: string
        slug?: string[]
    }
}

export default async function DocumentPage({ params }: Props) {
    const article = await articleQuery({
        documentName: params.document,
        articleTitle: params.slug ? params.slug.slice(-1)[0] : undefined,
    })

    return (
        <div className="flex flex-col items-center md:w-full lg:w-[700px] lg:min-w-[500px]">
            <div className="w-full flex-initial flex-col items-center justify-stretch gap-y-7 p-3 text-start">
                <h1 className="my-2 text-4xl">{article?.title}</h1>
                <ArticleEditForm article={article!} />
            </div>
        </div>
    )
}
