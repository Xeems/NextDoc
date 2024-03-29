'use client'

import DocumentCard from './DocumentCard'
import { FilePlus2Icon } from 'lucide-react'

type Props = {
    documents?: DocType[]
    withFooter?: boolean
}

export default function DocumentList({ documents, withFooter = true }: Props) {
    if (!documents || documents.length === 0) {
        return (
            <div className="flex w-full flex-col items-center gap-y-5 ">
                <div className="size-fit rounded-lg border border-solid border-border p-4">
                    <FilePlus2Icon
                        absoluteStrokeWidth
                        className="m-auto size-12"
                        strokeWidth={0.5}
                    />
                </div>
                <span className="">No documents</span>
                <span className="text-center text-sm font-extralight text-muted-foreground">
                    There are no documents in this workspace yet
                </span>
            </div>
        )
    }

    return (
        <div className="w-full @container">
            <div className="grid w-full grid-cols-1 gap-5 @[500px]:grid-cols-2  @[1000px]:grid-cols-3">
                {documents?.map((document) => {
                    return (
                        <DocumentCard
                            withFooter={withFooter}
                            document={document}
                            key={document.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}
