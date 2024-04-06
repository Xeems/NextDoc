'use client'

import { uploadImageAction } from '@/server/actions/article/uploadImage'
import { JsonValue } from '@prisma/client/runtime/library'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import Dropcursor from '@tiptap/extension-dropcursor'
import Heading from '@tiptap/extension-heading'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { lowlight } from 'lowlight/lib/core'
import { toast } from 'sonner'
import ImageResize from 'tiptap-extension-resize-image'

import EditorToolBar from './EditorToolBar'

type Props = {
    initialValue?: JsonValue
    onChange: (content: JSON | undefined) => void
}

const Editor = ({ initialValue = undefined, onChange }: Props) => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'text-base rounded-md border border-solid border-border bg-background-accent py-3 px-4 ring-offset-background placeholder:text-muted-foreground hover:border-input focus-visible:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            },
            handleDrop: function (view, event, slice, moved) {
                if (
                    !moved &&
                    event.dataTransfer &&
                    event.dataTransfer.files &&
                    event.dataTransfer.files[0]
                ) {
                    let file = event.dataTransfer.files[0]
                    let filesize = parseFloat(
                        (file.size / 1024 / 1024).toFixed(4),
                    )
                    if (
                        (file.type === 'image/jpeg' ||
                            file.type === 'image/png') &&
                        filesize < 10
                    ) {
                        let _URL = window.URL || window.webkitURL
                        if (typeof window !== 'undefined') {
                            let img = new Image() /* global Image */
                            img.src = _URL.createObjectURL(file)
                            img.onload = function () {
                                if (img.width > 5000 || img.height > 5000) {
                                    toast.error(
                                        'Your images need to be less than 5000 pixels in height and width.',
                                    )
                                } else {
                                    const data = new FormData()
                                    data.append('file', file)
                                    uploadImageAction(data)
                                        .then(function (response) {
                                            if (response.error) {
                                                toast.error(response.error)
                                                return false
                                            }
                                            const { schema } = view.state
                                            const coordinates =
                                                view.posAtCoords({
                                                    left: event.clientX,
                                                    top: event.clientY,
                                                })
                                            const node =
                                                schema.nodes.image.create({
                                                    src: response.src,
                                                }) // creates the image element
                                            const transaction =
                                                view.state.tr.insert(
                                                    // @ts-ignore
                                                    coordinates.pos,
                                                    node,
                                                ) // places it in the correct position
                                            return view.dispatch(transaction)
                                        })
                                        .catch(function (error) {
                                            if (error) {
                                                toast.error(
                                                    'There was a problem uploading your image, please try again.',
                                                )
                                            }
                                        })
                                }
                            }
                        }
                    } else {
                        toast.error(
                            'Images need to be in jpg or png format and less than 10mb in size.',
                        )
                    }
                    return true
                }
                return false
            },
        },
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                code: false,
                heading: false,
                paragraph: false,
                dropcursor: false,
                bulletList: false,
                orderedList: false,
            }),
            Heading.configure({
                levels: [2],
                HTMLAttributes: {
                    class: 'py-10 mt-10 text-2xl font-bold border-0 border-solid border-t border-border',
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'bg-secondary rounded border border-solid border-border p-1 my-1',
                },
            }),
            Code.configure({
                HTMLAttributes: {
                    class: 'bg-accent rounded border border-solid border-border',
                },
            }),
            Paragraph.configure({
                HTMLAttributes: {
                    class: 'leading-7',
                },
            }),
            ImageResize.configure({
                inline: true,
                allowBase64: true,
            }),
            Dropcursor.configure({
                color: '#ff0000',
            }),
            BulletList.configure({
                keepMarks: true,
                HTMLAttributes: {
                    class: 'list-disc mx-10',
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal mx-10',
                },
            }),
        ],
        //@ts-ignore
        content: {
            type: 'doc',
            content: initialValue || {},
        },
        onUpdate: ({ editor }) => {
            const jsonContent = editor.getJSON().content
            if (!jsonContent) {
                onChange(undefined)
                return
            } else {
                const constentString = JSON.stringify(jsonContent)
                const content = JSON.parse(constentString)
                onChange(content)
            }
        },
    })

    return (
        <div className="flex w-full flex-col justify-stretch gap-y-2">
            <EditorToolBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default Editor
