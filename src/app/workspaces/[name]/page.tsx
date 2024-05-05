import { Input } from '@/src/components/shadCn/ui/input'
import DocumentList from '@/src/components/UI/DocumentList'
import { workspaceDocumentsQuery } from '@/src/hooks/querys/useWorkspaceDocuments'

import { CreateNewDocumentButton } from './CreateNewDocumentButton'

type Props = {
    params: {
        name: string
    }
}

const WorkspacePage = async ({ params }: Props) => {
    const { data: documents } = await workspaceDocumentsQuery(params.name)

    return (
        <div className="flex w-full flex-col items-center gap-y-5 bg-background px-2 py-5 lg:min-w-[64rem] lg:max-w-[70rem]">
            <div className="flex h-fit w-full flex-row gap-x-3">
                <Input
                    className="bg-background-accent text-base font-extralight"
                    placeholder="Sort documents"
                />
                <CreateNewDocumentButton />
            </div>

            <DocumentList documents={documents} />
        </div>
    )
}

export default WorkspacePage
