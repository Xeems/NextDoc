import React from 'react'

import ReactMarkdown from '@/src/components/TextEditor/ReactMarkdown'
import { articleQuery } from '@/src/hooks/querys/useArticle'

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
        <div className="flex w-full flex-col items-center">
            <title className="my-2 w-full text-start text-4xl">
                {article?.title}
            </title>
            <ReactMarkdown markdown={article?.content} />
        </div>
    )
}
