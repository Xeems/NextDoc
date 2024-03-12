'use server'

import { getTeamDocuments } from '@/server/db/team.data'

export const getDocumentsAction = async (name: string) => {
    try {
        const res = await getTeamDocuments(name)
        if (!res) throw new Error('Failed to get documents')
        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
