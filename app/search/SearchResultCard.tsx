import { lazy } from 'react'

type Props = {
    searchResult: UserType | DocType | TeamType
}

const DocumentSearchCard = lazy(() => import('./DocumentSearchCard'))
const UserSearchCard = lazy(() => import('./UserSearchCard'))
const TeamSearchCard = lazy(() => import('./TeamSearchCard'))

export default function SearchResultCard({ searchResult }: Props) {
    const type = checkSearchResultType({ searchResult })
    console.log(type)
    switch (type) {
        case 'document': {
            const doc: DocType = searchResult as DocType
            return <DocumentSearchCard doc={doc} />
        }
        case 'user': {
            const user: UserType = searchResult as UserType
            return <UserSearchCard user={user} />
        }
        case 'team': {
            const team: TeamType = searchResult as TeamType

            return <TeamSearchCard team={team} />
        }
    }
}

function checkSearchResultType({ searchResult }: Props) {
    if (typeof searchResult === 'object') {
        if ('username' in searchResult) {
            return 'user'
        } else if ('type' in searchResult) {
            return 'document'
        } else if ('documents' || 'description' in searchResult) {
            return 'team'
        }
    }
    return undefined
}
