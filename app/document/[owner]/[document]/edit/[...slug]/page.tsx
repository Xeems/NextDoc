'use client'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/shadCn/ui/tabs'
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

export default function DocumentPage({ params }: Props) {
    if (params.slug == undefined) notFound()
    // const { data } = useArticleQuery({
    //     documentName: params.document,
    //     articleTitle: params.slug.slice(-1)[0],
    // })
    const [markdown, setMarkdown] = useState<string>('')
    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex flex-initial flex-row items-start justify-stretch gap-7 p-3 text-start min-w-[700px]">
                <Tabs
                    defaultValue="editor"
                    className="flex flex-col w-full min-w-[700px] justify-center">
                    <TabsList className="w-fit">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editor" className="w-full">
                        <textarea
                            autoFocus={true}
                            className="min-h-40 outline-none w-full"
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                        />
                    </TabsContent>
                    <TabsContent value="preview" className="">
                        <ReactMarkdown markdown={markdown} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
