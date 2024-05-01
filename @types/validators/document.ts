import { z } from 'zod'

export const documentNameSchema = z.object({
    documentName: z
        .string()
        .min(5, { message: 'At least 5 symbols' })
        .regex(/^[a-zA-Z0-9\s\u0400-\u04FF-]*$/, {
            message: 'The string must not contain special characters',
        }),
})

export type DocumentNameAndOwnerType = z.infer<typeof documentNameSchema>

export const newDocumentSchema = documentNameSchema.extend({
    documentDescription: z
        .string()
        .min(1, { message: 'At least 10 characters' }),
    documentType: z.enum(['public', 'private']),
    workspaceId: z.string().min(1),
})

export type NewDocumentType = z.infer<typeof newDocumentSchema>
