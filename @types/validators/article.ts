import * as z from 'zod'

export const baseArticleSchema = z.object({
    id: z.string(),
    title: z
        .string()
        .min(5, { message: 'Ar least 5 symbols' })
        .max(30, { message: '30 symbols maximum' }),
})

export const newArticleSchema = z.object({
    title: z
        .string()
        .min(5, { message: 'Ar least 5 symbols' })
        .max(30, { message: '30 symbols maximum' }),

    haveParent: z.boolean().default(false),
    parentArticleId: z.lazy(() => {
        if (newArticleSchema.shape.haveParent) {
            return z.string().optional()
        }
        return z.object({}).optional()
    }),
})

export type newArticleType = z.infer<typeof newArticleSchema>
