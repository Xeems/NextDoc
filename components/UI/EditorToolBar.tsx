'use client'

import { type Editor } from '@tiptap/react'
import { Toggle } from '../shadCn/ui/toggle'
import {
    Bold,
    Code,
    Code2,
    Heading2,
    Image,
    Italic,
    ListIcon,
    ListOrdered,
    Strikethrough,
} from 'lucide-react'
import { Button } from '../shadCn/ui/button'
import { ChangeEvent, useRef } from 'react'
import { uploadImageAction } from '@/server/actions/article/uploadImage'
import { toast } from 'sonner'

type Props = {
    editor: Editor | null
}

export default function EditorToolBar({ editor }: Props) {
    const fileInputRef = useRef(null)

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            if (file) {
                const formData = new FormData()
                formData.append('file', file!)
                const response = await uploadImageAction(formData)

                if (response.error) {
                    toast.error(response.error)
                    return
                }
                if (response.src)
                    editor?.commands.setImage({
                        src: response.src,
                    })
            }
        }
    }

    return (
        <div className="flex w-full rounded-md border border-solid border-border bg-background-accent p-1">
            <Toggle
                pressed={editor?.isActive('heading')}
                onPressedChange={() => {
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }}>
                <Heading2 className="size-4" />
            </Toggle>

            <Toggle
                pressed={editor?.isActive('bold')}
                onPressedChange={() => {
                    editor?.chain().focus().toggleBold().run()
                }}>
                <Bold className="size-4" />
            </Toggle>

            <Toggle
                pressed={editor?.isActive('italic')}
                onPressedChange={() => {
                    editor?.chain().focus().toggleItalic().run()
                }}>
                <Italic className="size-4" />
            </Toggle>

            <Toggle
                pressed={editor?.isActive('strike')}
                onPressedChange={() => {
                    editor?.chain().focus().toggleStrike().run()
                }}>
                <Strikethrough className="size-4" />
            </Toggle>

            <Toggle
                pressed={editor?.isActive('code')}
                onPressedChange={() => {
                    editor?.chain().focus().toggleCode().run()
                }}>
                <Code className="size-4" />
            </Toggle>

            <Toggle
                pressed={editor?.isActive('codeBlock')}
                onPressedChange={() => {
                    editor?.chain().focus().toggleCodeBlock().run()
                }}>
                <Code2 className="size-4" />
            </Toggle>

            <Toggle
                pressed={editor?.isActive('bulletList')}
                onPressedChange={() => {
                    editor?.chain().focus().toggleBulletList().run()
                }}>
                <ListIcon className="size-4" />
            </Toggle>

            <Toggle
                pressed={editor?.isActive('orderedList')}
                onPressedChange={() => {
                    editor?.chain().focus().toggleOrderedList().run()
                }}>
                <ListOrdered className="size-4" />
            </Toggle>

            <Button
                variant={'secondary'}
                className="w-fit border-0 bg-background-accent p-3 hover:bg-muted hover:text-muted-foreground">
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="actual-btn"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <label htmlFor="actual-btn" onClick={(e) => e.preventDefault()}>
                    <Image className="size-4" />
                </label>
            </Button>
        </div>
    )
}
