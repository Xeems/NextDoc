import React from 'react'
import { FilePlus2Icon } from 'lucide-react'

export const EmptyDocumentList = () => (
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
