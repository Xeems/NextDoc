import { z } from 'zod'

export const searchSchema = z.object({
    searchQuery: z.string(),
    searchOptions: z.string().array().default(['users', 'teams', 'documents']),
})

export type SearchType = z.input<typeof searchSchema>
