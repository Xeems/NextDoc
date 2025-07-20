'use client'
import { useState } from 'react'
import {
    EllipsisVerticalIcon,
    FilePenLineIcon,
    FolderPenIcon,
    Trash2Icon,
} from 'lucide-react'
import Link from 'next/link'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/src/components/shadCn/ui/dropdown-menu'
import { useActivePath } from '@/src/hooks/useActivePath'
import { ROUTES } from '@/src/lib/routes'
import { cn } from '@/src/lib/utils'

type LinkProps = {
    article: ArticleType
    document: DocType
    workspaceName: string
    parent?: ArticleType
}

export const DocumentNavLink = ({
    article,
    document,
    workspaceName,
    parent = undefined,
}: LinkProps) => {
    const href = ROUTES.DOCUMENT_ARTICLE(workspaceName, document.urlName, [
        parent?.urlName!,
        article.urlName,
    ])
    const [open, setOpen] = useState(false)
    const path = useActivePath()
    const isActive = path(href)

    return (
        <Link
            draggable
            href={href}
            className={cn(
                'group flex flex-row items-center justify-between gap-x-2 overflow-hidden py-2 text-sm font-light ',
                parent &&
                    'ml-1 border-0 border-l  pl-3 text-muted-foreground hover:text-foreground',
                isActive && 'font-medium text-blue-600',
            )}>
            {article.title}
            <DropdownMenu onOpenChange={() => setOpen(!open)}>
                <DropdownMenuTrigger
                    className={cn(
                        'invisible group-hover:visible',
                        open && 'visible',
                    )}>
                    <EllipsisVerticalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                    <DropdownMenuItem className="gap-x-3  pl-4">
                        <FolderPenIcon className="size-4" />
                        Rename
                    </DropdownMenuItem>
                    <Link href={`${href}?edit=true`}>
                        <DropdownMenuItem className="gap-x-3  pl-4">
                            <FilePenLineIcon className="size-4" />
                            Edit
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="gap-x-3 pl-4 text-destructive">
                        <Trash2Icon className="size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Link>
    )
}
