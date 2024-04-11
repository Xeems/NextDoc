'use client'

import { notFound } from 'next/navigation'
import React, { useState } from 'react'
import Markdown from 'react-markdown'

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
        <div className="flex flex-col items-center md:w-full lg:w-[700px] lg:min-w-[500px]">
            <div className="w-full flex-initial flex-col items-center justify-stretch gap-y-7 p-3 text-start">
                <textarea
                    className="w-full min-h-40"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                />
                <div className="w-full min-h-10 markdown">
                    <Markdown>
                        {`${markdown}  # Hi

This is **not** a paragraph.`}
                    </Markdown>
                </div>
            </div>
        </div>
    )
}
