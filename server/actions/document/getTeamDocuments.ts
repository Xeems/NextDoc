'use server'

import { getTeamDocuments } from '@/server/db/team.data'

import { getUserBySessionAction } from '../user/getUserBySession'

export const getTeamDocumentsAction = async (name: string) => {
    const user = getUserBySessionAction()
    try {
        const res = await getTeamDocuments(name)
        if (!res) throw new Error('Failed to get documents')
        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
