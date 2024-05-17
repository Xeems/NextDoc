// prettier-ignore
export const ROUTES = {
    AUTH: '/auth',
    NEW: '/new',
    SEARCH: '/search',
    USER: (username: string) => `/users/${username}`,
    WORKSPACE: (workspace: string) => `/workspaces/${workspace}`,
    WORKSPACE_SETTINGS: (workspace: string) =>`/workspaces/${workspace}/settings`,
    WORKSPACE_USERS: (workspace: string) => `/workspaces/${workspace}/users`,
    DOCUMENT: (workspace: string, document: string) =>`/workspaces/${workspace}/document/${document}`,
    DOCUMENT_ARTICLE: (workspace: string, document: string, article:string) =>`/workspaces/${workspace}/document/${document}/${article}`,
} as const
