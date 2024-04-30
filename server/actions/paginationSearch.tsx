'use server'

import { searchSchema, SearchType } from '@/@types/validators/search'

import { paginationDocumentsSearch } from '../db/document.data'
import { paginationTeamsSearch } from '../db/team.data'
import { paginationUsersSearch } from '../db/user.data'

type Props = {
    data: SearchType
    page: number
}
export const paginationSearchAction = async ({ data, page }: Props) => {
    const validationResult = await searchSchema.safeParseAsync(data)

    if (!validationResult.success)
        throw new Error(
            `Server side validation failed ${validationResult.error.issues[0].message}`,
        )

    try {
        let res
        switch (data.searchTarget) {
            case 'documents': {
                res = await paginationDocumentsSearch(data.searchQuery, page)
                break
            }
            case 'users': {
                res = await paginationUsersSearch(data.searchQuery, page)
                break
            }
            case 'teams': {
                res = await paginationTeamsSearch(data.searchQuery, page)
                break
            }
        }

        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
