'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadCn/ui/dropdown-menu'
import { Delete, Edit, Edit3, MoreHorizontalIcon, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NewArticle from './newArticle'
import { useArticlesQuery } from '@/hooks/useArticlesQuery'
import { notFound } from 'next/navigation'

type Props = {
    document: DocType
}

export default function DocumentNav({ document }: Props) {
    const { data, error } = useArticlesQuery(document.id)
    if (error) {
        notFound()
    }
    const articles = data

    return (
        <nav className="w-72 transition-all delay-150 duration-300">
            <ul className="space-y-2 ">
                {articles?.map((article) => {
                    return (
                        <li key={article.id}>
                            <Link
                                href={`/document/${document.user?.username}/${document.idName}/${article.idTitle}`}
                                className="group flex flex-row items-center justify-between gap-x-2 overflow-hidden text-base font-normal">
                                {article.title}
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreHorizontalIcon className="invisible size-4 group-hover:visible" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="gap-x-2">
                                            <Edit3 className="h-4 w-4" />
                                            Rename
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="gap-x-2">
                                            <Plus className="h-4 w-4" />
                                            Add article
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="gap-x-2">
                                            <Delete className="h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </Link>

                            <ul>
                                {article.childs?.map((child) => {
                                    return (
                                        <li
                                            key={child.title}
                                            className="group relative flex items-center py-2 text-sm font-light text-muted-foreground hover:text-foreground">
                                            <span className="absolute bottom-0 left-2 top-0 w-px bg-border" />
                                            <Link
                                                className="px-4"
                                                href={`/document/${document.user?.username}/${document.idName}/${article.title}/${child.title}`}>
                                                {child.title}
                                            </Link>
                                            <Edit className="invisible ml-auto size-4 group-hover:visible" />
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
            <NewArticle articles={articles} document={document} />
        </nav>
    )
}
