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
import { getArticleByTitleAction } from '@/server/actions/article/getArticleByTitle'
import { updateAricleContentAction } from '@/server/actions/article/updateAricleContent'
import { useMutation } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    params: {
        owner: string
        document: string
        slug: string[]
    }
}

export default function DocumentPage({ params }: Props) {
    if (params.slug == undefined) notFound()
    // const { data: article } = useArticleQuery({
    //     documentName: params.document,
    //     articleTitle: params.slug.slice(-1)[0],
    // })
    const [markdown, setMarkdown] = useState<string>('')

    useEffect(() => {
        ;async () => {
            const res = await getArticleByTitleAction({
                documentName: params.document,
                articleTitle: params.slug.slice(-1)[0],
            })
            console.log(res)
            setMarkdown(res.data?.content!)
        }
    }, [])

    // const mutation = useMutation({
    //     mutationKey: ['article', params.document, params.slug.slice(0)[-1]],
    //     mutationFn: () => updateAricleContentAction(article!.id, markdown),
    // })

    // const handleSave = async () => {
    //     try {
    //         await mutation.mutateAsync() // Trigger the mutation
    //         toast.success('Article content updated successfully!')
    //     } catch (error) {
    //         toast.error('Error updating article content')
    //     }
    // }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex flex-initial flex-row items-start justify-stretch gap-7 p-3 text-start min-w-[700px]">
                <Tabs
                    defaultValue="editor"
                    className="flex flex-col  w-[700px] justify-center">
                    <TabsList className="w-fit">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <Button type="submit">Save</Button>
                    </TabsList>
                    <TabsContent value="editor" className="w-full">
                        <form>
                            <textarea
                                autoFocus={true}
                                className="min-h-40 outline-none w-full border rounded-md p-2"
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                            />
                        </form>
                    </TabsContent>
                    <TabsContent value="preview" className="">
                        <ReactMarkdown markdown={markdown} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
