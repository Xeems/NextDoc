'use server'

import { updateAricleContent } from '@/src/server/db/article.data'

export const updateAricleContentAction = async (
    airticleId: string,
    content: string,
) => {
    try {
        const res = await updateAricleContent(airticleId, content)
        return { data: res }
    } catch (error) {
        console.error(error)
        return { error: 'Errors happends' }
    }
}
