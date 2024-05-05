'use client'

import DocumentCard from './DocumentCard'
import { EmptyDocumentList } from './EmptyDocumentList'

type Props = {
    documents?: DocType[]
}

export default function DocumentList({ documents }: Props) {
    if (!documents || documents.length === 0) return <EmptyDocumentList />

    return (
        <div className="w-full @container">
            <div className="grid  w-full grid-cols-1 gap-5 @[500px]:grid-cols-2 @[1000px]:grid-cols-3">
                {documents?.map((document) => {
                    return (
                        <DocumentCard document={document} key={document.id} />
                    )
                })}
            </div>
        </div>
    )
}
