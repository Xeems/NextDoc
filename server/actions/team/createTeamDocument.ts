'use server'

import { createTeamDocument } from '@/server/db/team.data'

export const createTeamDoucmentAction = async () => {
    try {
        const res = createTeamDocument()
        if (res) {
            return { data: res }
        }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
