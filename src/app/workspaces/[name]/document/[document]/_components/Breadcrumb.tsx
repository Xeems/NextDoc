'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/src/components/shadCn/ui/breadcrumb'

type Props = {
    ignoredSegments?: string[]
}

export const DocumentBreadcrumb = ({ ignoredSegments }: Props) => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter((item) => item !== '')
    return (
        <Breadcrumb className="my-2">
            <BreadcrumbList>
                {segments.map((segment, index) => {
                    if (ignoredSegments?.includes(segment)) return null // Return null for ignored segments
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator key={`separator-${index}`} />
                            <BreadcrumbItem key={`item-${index}`}>
                                <BreadcrumbLink
                                    href={`/${segments.slice(0, index + 1).join('/')}`}
                                    key={`link-${index}`}>
                                    {segment}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
