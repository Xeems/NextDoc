import { z } from 'zod'

export const newDocSchema = z.object({
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
})

export type NewDocType = z.infer<typeof newDocSchema>

export const newDocWithCreatorSchema = newDocSchema.extend({
    userId: z.string(),
    teamId: z.string().optional(),
})

export type NewDocumentWithCreatorType = z.infer<typeof newDocWithCreatorSchema>
