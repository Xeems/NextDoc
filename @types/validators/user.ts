import { z } from 'zod'

export const newUserSchema = z.object({
    email: z
        .string()
        .email({ message: 'This should be an Email' })
        .trim()
        .toLowerCase(),
    name: z.string().min(5, { message: 'At least 5 characters' }),
    password: z.string().min(7, { message: 'At least 7 characters' }),
})

export type NewUserType = z.input<typeof newUserSchema>
