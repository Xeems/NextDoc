'use server'

import { getWorkspaceDocuemnts } from '../../db/document.data'
import { getUserBySessionAction } from '../user/getUserBySession'

export const getWorkspaceDocumentsAction = async (name: string) => {
    const user = getUserBySessionAction()
    try {
        const res = await getWorkspaceDocuemnts(name)
        if (!res) throw new Error('Failed to get documents')
        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
