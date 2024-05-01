type UserType = {
    id: string
    name: string | null
    username: string
    email?: string | null
    image: string | null
    createdAt?: Date | null
    updatedAt?: Date
}

type WorspaceType = {
    id: string
    name: string
    imageLink?: string
    description?: string | null
    createdAt?: Date
    updatedAt?: Date

    documents?: DocType[]
}

type UserWorkspaceType = {
    id: string
    userId: string
    worksapceId: string
    role: WorkspaceRoleType
    status?: string | null
    createdAt: Date
    updatedAt: Date
    user: UserType
    worksapce: WorspaceType
}

type WorkspaceRoleType = 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'

type DocType = {
    id: string
    idName: string
    name: string
    description?: string | null
    type: string

    createdAt: Date
    updatedAt: Date

    worksapceId?: string | null
    worksapce?: WorspaceType | null
}

type ArticleType = {
    id: string | null
    title: string
    idTitle: string
    content?: null | string

    documentId: string
    parrent?: ArticleType
    childs?: ArticleType[]
}
