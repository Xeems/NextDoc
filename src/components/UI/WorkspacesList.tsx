import { CircleDashedIcon } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '../shadCn/ui/avatar'
import { Card, CardContent, CardHeader } from '../shadCn/ui/card'
import { ROUTES } from '@/src/lib/routes'

type Props = {
    workspaces: WorkspaceType[] | undefined
    variant?: 'default' | 'popup'
}

export default function WorkspacesList({
    workspaces,
    variant = 'default',
}: Props) {
    if (!workspaces || !Array.isArray(workspaces) || workspaces == null) {
        return (
            <span className="mb-4 text-sm font-light text-muted-foreground">
                No workspaces yet
            </span>
        )
    }
    return (
        <ul>
            {workspaces &&
                workspaces.map((workspace) => {
                    return (
                        <li key={workspace.id}>
                            {
                                {
                                    default: (
                                        <WorkspacesListItemCard
                                            workspace={workspace}
                                        />
                                    ),
                                    popup: (
                                        <WorkspacesListItemPopUp
                                            workspace={workspace}
                                        />
                                    ),
                                }[variant]
                            }
                        </li>
                    )
                })}
        </ul>
    )
}

export function WorkspacesListItemPopUp({
    workspace,
}: {
    workspace: WorkspaceType
}) {
    return (
        <Link
            className="flex flex-row items-center gap-x-4 rounded-md p-2 hover:bg-accent"
            href={ROUTES.WORKSPACE(workspace.name)}>
            <Avatar className="h-5 w-5 bg-background">
                <AvatarImage
                    src={workspace.imageLink || undefined}
                    className="bg-transparent"
                />
                <AvatarFallback>
                    <CircleDashedIcon className="bg-transparen h-5 w-5 text-blue-600" />
                </AvatarFallback>
            </Avatar>
            {workspace.name}
        </Link>
    )
}

export function WorkspacesListItemCard({
    workspace,
}: {
    workspace: WorkspaceType
}) {
    return (
        <Link className="" href={ROUTES.WORKSPACE(workspace.name)}>
            <Card className="my-2 max-w-[300px]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <span className="text-xl font-semibold">
                        {workspace.name}
                    </span>
                    <Avatar className="size-10 bg-background">
                        <AvatarImage
                            src={workspace.imageLink || undefined}
                            className="bg-transparent"
                        />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </CardHeader>
                {workspace.description && (
                    <CardContent>
                        <p className="text-muted-foreground">
                            {workspace.description}123
                        </p>
                    </CardContent>
                )}
            </Card>
        </Link>
    )
}
