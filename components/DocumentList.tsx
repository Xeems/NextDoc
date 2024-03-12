'use client'

import { useContext } from 'react'
import DocumentCard from './DocumentCard'
import { TeamContext } from '@/app/teams/[name]/TeamContext'
import { FilePlus2Icon } from 'lucide-react'

type Props = {
    documents?: DocType[]
}

export default function DocumentList({ documents }: Props) {
    const teamContext = useContext(TeamContext)
    if (!documents || documents.length === 0) {
        if (teamContext.userRole === 'BASE' || teamContext.userRole === 'NONE')
            return <span>There are no documents here yet</span>
        else {
            return (
                <div className="flex w-[250px] flex-col items-center gap-y-5 ">
                    <div className="size-fit rounded-lg border border-solid border-border p-4">
                        <FilePlus2Icon
                            absoluteStrokeWidth
                            className="m-auto size-12"
                            strokeWidth={0.5}
                        />
                    </div>
                    <span className="">Create new document</span>
                    <span className="text-center text-sm font-extralight text-muted-foreground">
                        There are no documents in this workspace yet, but you
                        can fix that.
                    </span>
                </div>
            )
        }
    }

    return (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {documents?.map((document) => {
                return <DocumentCard document={document} key={document.id} />
            })}
        </div>
    )
}
