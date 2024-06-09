'use client'
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
import { cn } from '@/src/lib/utils'

type LinkProps = {
    title: string
    href: string
    isChild?: boolean
}

export const DocumentNavLink = ({
    title,
    href,
    isChild = false,
}: LinkProps) => {
    const path = useActivePath()
    const isActive = path(href)
    return (
        <Link
            href={href}
            className={cn(
                'group flex flex-row items-center justify-between gap-x-2 overflow-hidden py-2 text-sm font-light ',
                isChild &&
                    'ml-1 border-0 border-l  pl-3 text-muted-foreground hover:text-foreground',
                isActive && 'font-medium text-blue-600',
            )}>
            {title}
            <DropdownMenu>
                <DropdownMenuContent className="group peer w-40">
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
                <DropdownMenuTrigger className="peer-hover:visible peer-data-[state=open]:text-red-600">
                    <EllipsisVerticalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
            </DropdownMenu>
        </Link>
    )
}
