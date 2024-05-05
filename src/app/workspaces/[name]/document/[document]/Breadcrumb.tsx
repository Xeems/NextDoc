'use client'

import {
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Breadcrumb,
} from '@/src/components/shadCn/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    ignoredSegments?: string[]
}

export const DocumentBreadcrumb = ({ ignoredSegments }: Props) => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter((item) => item !== '')
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                {segments.map((segment, index) => {
                    if (ignoredSegments?.includes(segment)) return <></>
                    return (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem key={segment}>
                                <BreadcrumbLink
                                    href={`/${segments.slice(0, index + 1).join('/')}`}>
                                    {segment}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
