type UserType = {
    id: string
    name: string | null
    username: string
    email?: string | null
    image: string | null
    createdAt?: Date | null
    updatedAt?: Date
}

type TeamType = {
    id: string
    name: string
    imageLink?: string
    description?: string | null
    createdAt?: Date
    updatedAt?: Date

    documents?: DocType[]
}

type UserTeamType = {
    id: string
    userId: string
    teamId: string
    role: TeamRoleType
    status?: string | null
    createdAt: Date
    updatedAt: Date
    user: UserType
    team: TeamType
}

type TeamRoleType = 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'

type DocType = {
    id: string
    idName: string
    name: string
    description?: string | null
    type: string
    createdAt: Date
    updatedAt: Date

    userId?: string | null
    user?: UserType | null

    teamId?: string | null
    team?: TeamType | null
}

type ArticleType = {
    id: string | null
    title: string
    idTitle: string
    content?: null | import('@prisma/client/runtime/library').JsonValue

    documentId: string
    parrent?: ArticleType
    childs?: ArticleType[]
}
