import React from 'react'
import { MoreVerticalIcon } from 'lucide-react'

export default function TableRowActions(row: any) {
    return (
        <div className="rounded-full px-1 py-2 hover:bg-accent">
            <MoreVerticalIcon className="size-4 " />
        </div>
    )
}
