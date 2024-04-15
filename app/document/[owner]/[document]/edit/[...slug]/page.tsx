'use client'

import { Button } from '@/components/shadCn/ui/button'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/shadCn/ui/tabs'
import ReactMarkdown from '@/components/TextEditor/ReactMarkdown'
import { useArticleQuery } from '@/hooks/querys/useArticleQuery'
import { updateAricleContentAction } from '@/server/actions/article/updateAricleContent'
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
    const { data: article } = useArticleQuery({
        documentName: params.document,
        articleTitle: params.slug.slice(-1)[0],
    })
    const [markdown, setMarkdown] = useState<string>(article?.content! || '')
    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex flex-initial flex-row items-start justify-stretch gap-7 p-3 text-start min-w-[700px]">
                <Tabs
                    defaultValue="editor"
                    className="flex flex-col  w-[700px] justify-center">
                    <TabsList className="w-fit">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <Button
                            onClick={async () => {
                                const res = await updateAricleContentAction(
                                    article!.id,
                                    markdown,
                                )
                                console.log(res)
                            }}>
                            Save
                        </Button>
                    </TabsList>
                    <TabsContent value="editor" className="w-full">
                        <textarea
                            autoFocus={true}
                            className="min-h-40 outline-none w-full border rounded-md p-2"
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
