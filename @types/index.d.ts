type UserType = {
    id: string
    name: string | null
    username: string
    email?: string | null
    image: string | null

    createdAt?: Date | null
    updatedAt?: Date
}

type WorkspaceType = {
    id: string
    name: string
    imageLink?: string | null
    description?: string | null
    workspaceType: WorkspaceVariant

    createdAt?: Date
    updatedAt?: Date

    users?: UserWorkspaceType[]
    documents?: DocType[]
}

type WorkspaceVariant = 'USER' | 'TEAM'

type UserWorkspaceType = {
    id: string
    role: WorkspaceRoleType
    status?: string

    createdAt: Date
    updatedAt: Date

    userId: string
    user: UserType

    worksapceId: string
    worksapce: WorkspaceType
}

type WorkspaceRoleType = 'OWNER' | 'ADMIN' | 'BASE' | 'NONE'

type DocType = {
    id: string
    name: string
    urlName: string
    description: string
    documentVisability: VisavilityType

    createdAt: Date
    updatedAt: Date

    articles?: ArticleType[]

    worksapceId?: string | null
    workspace?: Partial<WorkspaceType> | null
}

type VisavilityType = 'public' | 'private'

type ArticleType = {
    id: string | null
    title: string
    urlName: string
    content?: null | string

    documentId: string
    parrent?: ArticleType
    childs?: ArticleType[]
}
