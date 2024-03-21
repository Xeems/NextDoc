'use client'

import React, { Suspense, useState } from 'react'
import { useArticleQuery } from '@/hooks/useArticleQuery'
import { notFound } from 'next/navigation'
import DocumentEditForm from './DocumentEditForm'
import EmptyDocument from './EmptyDocument'

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
                    <DocumentEditForm article={article} />
                </div>
            </div>
        </Suspense>
    )
}
