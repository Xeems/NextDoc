import { CircleOffIcon } from 'lucide-react'
import React from 'react'

export default function EmptyDocument() {
    return (
        <div className="flex flex-col items-center md:w-full lg:w-[700px] lg:min-w-[500px]">
            <div className="size-fit rounded-lg border border-solid border-border p-4">
                <CircleOffIcon className="size-10" strokeWidth={0.5} />
            </div>
            <span className=" mt-3 text-lg font-light">
                This document is empty
            </span>
            <span className="text-center text-sm font-extralight text-muted-foreground">
                This document does not yet contain articles
            </span>
        </div>
    )
}
