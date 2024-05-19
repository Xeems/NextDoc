import useDebounce from '@/src/hooks/useDebounce'

import { getDocumentAction } from '@/src/server/actions/document/getDocument'
import { getDocumentByWorkspaceIdAndName } from '@/src/server/db/document.data'
import { useEffect, useState } from 'react'

type Props = {
    workspaceId: string
    name: string
}
const useCheckDoucmentName = ({ name, workspaceId }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const debouncedName = useDebounce(name, 300)

    useEffect(() => {
        setLoading(true)
        ;(async () => {
            const res = await getDocumentByWorkspaceIdAndName(
                workspaceId,
                debouncedName,
            )
            if (res)
                setError(
                    'You already have a document in this workspace with the same name',
                )
            else {
                setError(null)
            }
            setLoading(false)
        })()
    }, [debouncedName, workspaceId])

    return { loading, error }
}

export default useCheckDoucmentName
