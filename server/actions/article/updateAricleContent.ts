'use server'
import { updateAricleContent } from '@/server/db/article.data'

export const updateAricleContentAction = async (
    airticleId: string,
    content: string,
) => {
    try {
        const res = await updateAricleContent(airticleId, content)
        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Errors happends' }
    }
}
