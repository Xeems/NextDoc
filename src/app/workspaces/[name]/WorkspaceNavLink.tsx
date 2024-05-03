'use client'

import React from 'react'
import Link from 'next/link'

import { useActivePath } from '@/src/hooks/useActivePath'
import { cn } from '@/src/lib/utils'

type Props = {
    title: string
    href: string
}

export const WorkspaceNavLink = ({ title, href }: Props) => {
    const check = useActivePath()
    const isActive = check(href)

    return (
        <Link
            className={cn(
                'my-1 min-w-fit rounded-md px-4 py-1 align-text-bottom font-light text-muted-foreground transition-all hover:bg-accent hover:text-foreground ',
                isActive && 'bg-muted font-medium text-foreground-link',
            )}
            href={href}>
            {title}
        </Link>
    )
}
