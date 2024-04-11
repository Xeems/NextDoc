'use client'

import { Input } from '@/components/shadCn/ui/input'
import DocumentList from '@/components/UI/DocumentList'
import { useTeamDocumentsQuery } from '@/hooks/querys/useTeamDocumentsQuery'

import { CreateDocumentModal } from './CreateDocumentModal'

type Props = {
    params: {
        name: string
    }
}

export default function DashboardPage({ params }: Props) {
    const { data: documents, isLoading } = useTeamDocumentsQuery(params.name)

    if (isLoading) return <div>Loading</div>

    return (
        <div className="flex w-full flex-col items-center gap-y-5 bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem]">
            <div className="flex h-fit w-full flex-row gap-x-3">
                <Input
                    className="bg-background-accent text-base font-extralight"
                    placeholder="Sort documents"
                />
                <CreateDocumentModal />
            </div>
            <DocumentList documents={documents} />
        </div>
    )
}
