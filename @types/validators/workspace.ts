import { z } from 'zod'
import { usernameSchema } from './user'

export const workspaceNameSchema = z.object({
    name: z
        .string()
        .regex(/^\S+$/, { message: 'The name must not contain spaces' })
        .min(5, {
            message: 'The workspace name must contain at least 5 characters.',
        })
        .max(30, { message: '30 characters maximum' }),
})

export type WorkspaceNameType = z.infer<typeof workspaceNameSchema>

export const newWorkspaceServerSchema = workspaceNameSchema.extend({
    userId: z.string().min(1),
})

export type NewWorkspaceServerType = z.infer<typeof newWorkspaceServerSchema>

export const newWorkspaceUserSchema = z.object({
    userId: z.string(),
    workspaceId: z.string(),
    role: z.enum(['BASE', 'ADMIN']),
})

export type NewWorkspaceUserType = z.infer<typeof newWorkspaceUserSchema>

export const userWorkspacesQuerySchema = z.object({
    username: usernameSchema.optional(),
    userId: z.string().cuid().optional(),
    teamsOnly: z.boolean().default(true).optional(),
})

export type UserWorkspacesQueryType = z.infer<typeof userWorkspacesQuerySchema>
