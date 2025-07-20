import { useEffect, useState } from 'react'

import useDebounce from '@/src/hooks/useDebounce'
import { getDocumentByWorkspaceIdAndName } from '@/src/server/db/document.data'

type Props = {
    workspaceId: string
    name: string
}

const useCheckDocumentName = ({ name, workspaceId }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const debouncedName = useDebounce(name, 300)

    useEffect(() => {
        setLoading(true)
        const checkDocument = async () => {
            try {
                const res = await getDocumentByWorkspaceIdAndName(
                    workspaceId,
                    debouncedName.trim(),
                )
                if (res) {
                    setError(
                        'You already have a document in this workspace with the same name',
                    )
                } else if (!res) {
                    setError(null)
                }
            } finally {
                setLoading(false)
            }
        }

        checkDocument()
    }, [debouncedName, workspaceId])

    return { loading, debouncedName, error }
}

export default useCheckDocumentName
