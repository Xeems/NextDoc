'use client'

import React, { forwardRef, lazy, Suspense, useEffect, useState } from 'react'

import { Button } from '../shadCn/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../shadCn/ui/tabs'

type Props = {} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const ReactMarkdown = lazy(
    () => import('@/src/components/TextEditor/ReactMarkdown'),
)

const MarkdownEditor = forwardRef<HTMLTextAreaElement, Props>(
    ({ className, ...props }, ref) => {
        const [markdown, setMarkdown] = useState<string>(
            props.value?.toString() || '',
        )

        useEffect(() => {
            setMarkdown(props.value?.toString() || '')
        }, [props.value])
        return (
            <Tabs
                defaultValue="editor"
                className="flex w-[700px] flex-col justify-center">
                <div className="flex flex-row gap-x-4">
                    <TabsList className="w-fit">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <Button type="submit">Save</Button>
                </div>

                <TabsContent value="editor" className="w-full">
                    <textarea
                        ref={ref}
                        {...props}
                        className="min-h-40 w-full rounded-md border bg-background-accent p-2 outline-none"
                    />
                </TabsContent>
                <TabsContent value="preview" className="">
                    <Suspense fallback={'Loadind preview...'}>
                        <ReactMarkdown markdown={markdown} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        )
    },
)

MarkdownEditor.displayName = 'MarkdownEditor'

export { MarkdownEditor }
