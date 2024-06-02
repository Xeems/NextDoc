'use client'

import Link from 'next/link'

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
                'group flex flex-row items-center justify-between gap-x-2 overflow-hidden py-2 text-sm font-light',
                isChild &&
                    'ml-1 border-0 border-l  pl-3 text-muted-foreground hover:text-foreground',
                isActive && 'font-medium text-blue-600',
            )}>
            {title}
        </Link>
    )
}
