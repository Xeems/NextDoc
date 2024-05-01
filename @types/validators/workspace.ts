import { z } from 'zod'

export const newWorkspaceSchema = z.object({
    name: z
        .string()
        .regex(/^\S+$/, { message: 'The name must not contain spaces' })
        .min(5, {
            message: 'The workspace name must contain at least 5 characters.',
        }),
})

export type NewWorkspaceType = z.infer<typeof newWorkspaceSchema>

export const newWorkspaceServerSchema = newWorkspaceSchema.extend({
    userId: z.string().min(1),
})

export type newWorkspaceServerType = z.infer<typeof newWorkspaceServerSchema>

export const newWorkspaceUserSchema = z.object({
    userId: z.string(),
    workspaceId: z.string(),
    role: z.enum(['BASE', 'ADMIN']),
})

export type newWorkspaceUserType = z.infer<typeof newWorkspaceUserSchema>
