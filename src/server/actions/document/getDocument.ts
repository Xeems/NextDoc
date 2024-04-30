'use server'

import { getDocumentByOwner } from '@/src/server/db/document.data'

import { validateTeamMemberAction } from '../team/validateTeamMember'
import { getUserBySessionAction } from '../user/getUserBySession'

export const getDocumentAction = async (username: string, idName: string) => {
    const user = await getUserBySessionAction()

    try {
        let userRole: TeamRoleType = 'NONE'
        let documentType = 'USER'
        const doc = await getDocumentByOwner(username, idName)
        if (doc?.userId == user?.id) userRole = 'OWNER'
        if (doc?.team) {
            documentType = 'TEAM'
            if (user?.id) {
                const res = await validateTeamMemberAction(
                    user?.id,
                    doc.team.id,
                )
                if (res.data) userRole = res.data.role
            }
        }

        return { data: { doc, userRole } }
    } catch (err: unknown) {
        console.log(err)
        return { error: 'Failed to receive document' }
    }
}
