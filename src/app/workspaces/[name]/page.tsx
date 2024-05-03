'use client'

import Link from 'next/link'

import { Button } from '@/src/components/shadCn/ui/button'
import { Input } from '@/src/components/shadCn/ui/input'
import DocumentList from '@/src/components/UI/DocumentList'
import { useWorkspaceDocumentsQuery } from '@/src/hooks/querys/useWorkspaceDocuments'

type Props = {
    params: {
        name: string
    }
}

export const WorkspacePage = ({ params }: Props) => {
    const { data: documents, isLoading } = useWorkspaceDocumentsQuery(
        params.name,
    )

    if (isLoading) return <div>Loading</div>

    return (
        <div className="flex w-full flex-col items-center gap-y-5 bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem]">
            <div className="flex h-fit w-full flex-row gap-x-3">
                <Input
                    className="bg-background-accent text-base font-extralight"
                    placeholder="Sort documents"
                />
                <Link href="/new">
                    <Button>Create document</Button>
                </Link>
            </div>
            <DocumentList documents={documents} />
        </div>
    )
}

export default WorkspacePage
