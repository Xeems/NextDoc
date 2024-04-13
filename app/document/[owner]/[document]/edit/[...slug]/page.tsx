'use client'

import ReactMarkdown from '@/components/TextEditor/ReactMarkdown'
import { notFound } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
    params: {
        owner: string
        document: string
        slug: string[]
    }
}

const markdown = '#### Hello World'

export default async function DocumentPage({ params }: Props) {
    if (params.slug == undefined) notFound()
    // const { data } = useArticleQuery({
    //     documentName: params.document,
    //     articleTitle: params.slug.slice(-1)[0],
    // })
    const [markdown, setMarkdown] = useState<string>('')
    return (
        <div className="flex flex-col items-center md:w-full ">
            <div className="w-full flex flex-initial flex-row items-start justify-stretch gap-7 p-3 text-start">
                <textarea
                    autoFocus={true}
                    className="w-[500px] min-h-40 outline-none"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                />
                <div className="w-[500px]">
                    <ReactMarkdown markdown={markdown} />
                </div>
            </div>
        </div>
    )
}
