'use server'

import { searchSchema, SearchType } from '@/@types/validators/search'

import { paginationDocumentsSearch } from '../db/document.data'
import { paginationUsersSearch } from '../db/user.data'
import { paginationWorkspacesSearch } from '../db/workspace.data'

import { getUserBySessionAction } from './user/getUserBySession'

type Props = {
    data: SearchType
    page: number
}
export const paginationSearchAction = async ({ data, page }: Props) => {
    const validationResult = await searchSchema.parseAsync(data)

    const user = await getUserBySessionAction()
    try {
        let res
        switch (data.searchTarget) {
            case 'documents': {
                res = await paginationDocumentsSearch(
                    data.searchQuery,
                    page,
                    user?.id,
                )
                break
            }
            case 'users': {
                res = await paginationUsersSearch(data.searchQuery, page)
                break
            }
            case 'workspaces': {
                res = await paginationWorkspacesSearch(data.searchQuery, page)
                break
            }
        }

        return { data: res }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}
