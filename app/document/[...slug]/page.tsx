'use client'

import React, { Suspense, useContext } from 'react'
import { useArticleQuery } from '@/hooks/useArticleQuery'
import DocumentEditForm from './DocumentEditForm'
import EmptyDocument from './EmptyDocument'
import { DocumentContext } from './DocumentContext'

type Props = {
    params: {
        slug: string[]
    }
}

export default function DocumentPage({ params }: Props) {
    const articleFn = () => {
        if (params.slug.length == 2) return undefined
        return params.slug[params.slug.length - 1]
    }
    const articleTitle = articleFn()
    const documentContext = useContext(DocumentContext)

    const {
        data: article,
        error: articleError,
        isLoading: articleLoading,
    } = useArticleQuery({ documentName: params.slug[1], articleTitle })

    if (!article || article == null) return <EmptyDocument />

    return (
        <Suspense fallback={<div>Loading</div>}>
            <div className="flex flex-col items-center md:w-full lg:w-[700px] lg:min-w-[500px]">
                <div className="w-full flex-initial flex-col items-center justify-stretch gap-y-7 p-3 text-start">
                    <h1 className="my-2 text-4xl">{article?.title}</h1>
                    {documentContext.userRole == 'ADMIN' ||
                        (documentContext.userRole == 'OWNER' && (
                            <DocumentEditForm article={article} />
                        ))}
                </div>
            </div>
        </Suspense>
    )
}
