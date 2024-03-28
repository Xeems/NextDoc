'use server'

import { getTeamDocuments } from '@/server/db/team.data'
import { getUserBySessionTokenAction } from '../user/getUserBySessionToken'

export const getTeamDocumentsAction = async (name: string) => {
    const user = getUserBySessionTokenAction()
    try {
        const res = await getTeamDocuments(name)
        if (!res) throw new Error('Failed to get documents')
        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
