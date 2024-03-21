import { z } from 'zod'

export const newDocumentSchema = z.object({
    documentName: z
        .string()
        .min(5, { message: 'At least 5 symbols' })
        .regex(/^[a-zA-Z0-9\s\u0400-\u04FF-]*$/, {
            message: 'The string must not contain special characters',
        }),
    documentDescription: z
        .string()
        .min(1, { message: 'At least 10 characters' }),
    documentType: z.enum(['public', 'private']),
    teamId: z.string().optional(),
})

export type NewDocumentType = z.infer<typeof newDocumentSchema>

export const newDocWithCreatorSchema = newDocumentSchema.extend({
    userId: z.string(),
})

export type NewDocumentWithCreatorType = z.infer<typeof newDocWithCreatorSchema>
