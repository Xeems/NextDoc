import { z } from 'zod'

export const newTeamSchema = z.object({
    name: z
        .string()
        .regex(/^\S+$/, { message: 'The name must not contain spaces' })
        .min(5, {
            message: 'The team name must contain at least 5 characters.',
        }),
})

export type NewTeamType = z.infer<typeof newTeamSchema>

export const newTeamServerSchema = newTeamSchema.extend({
    userId: z.string().min(1),
})

export type newTeamServerType = z.infer<typeof newTeamServerSchema>

export const newTeamUserSchema = z.object({
    userId: z.string(),
    teamId: z.string(),
    role: z.enum(['BASE', 'ADMIN']),
})

export type newTeamUserType = z.infer<typeof newTeamUserSchema>
