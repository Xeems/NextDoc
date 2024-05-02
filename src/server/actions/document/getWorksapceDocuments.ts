'use server'

import { getWorkspaceDocuemnts } from '../../db/document.data'

export const getWorkspaceDocumentsAction = async (name: string) => {
    if (!name) throw new Error('No workspace name')
    try {
        const res = await getWorkspaceDocuemnts(name)
        if (!res) throw new Error('Failed to get documents')
        return { data: res }
    } catch (Error: unknown) {
        return { error: 'Failed to get documents' }
    }
}
