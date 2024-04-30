'use server'

import { authOptions } from '@/src/app/api/auth/[...nextauth]/options'
import { getUserDocuments } from '@/src/server/db/document.data'
import { getServerSession } from 'next-auth/next'

export const getUserDocumentsAction = async (username: string) => {
    const session = await getServerSession(authOptions)
    try {
        const res = await getUserDocuments(username, session?.user.id)
        if (!res) throw new Error('Failed to get documents')

        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
