import { z } from 'zod'

export const searchTargetValues = ['users', 'workspaces', 'documents'] as const

export const searchSchema = z.object({
    searchQuery: z.string(),
    searchTarget: z.enum(searchTargetValues),
})

export type SearchType = z.infer<typeof searchSchema>
