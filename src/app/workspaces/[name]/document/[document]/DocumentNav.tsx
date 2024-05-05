'use client'

import { useContext } from 'react'
import Link from 'next/link'

import { useArticlesQuery } from '@/src/hooks/querys/useArticles'

import { WorkspaceContext } from '../../WorkspaceContext'

import { cn } from '@/src/lib/utils'

type Props = {
    document: DocType
}

export default function DocumentNav({ document }: Props) {
    const { data, error } = useArticlesQuery(document.id)

    if (error) throw new Error('Something went wrong')
    const documentUrl = `/workspaces/${document.workspace?.name}/document/${document.idName}`
    const articles = data

    return (
        <nav className="w-80 transition-all delay-150 duration-300">
            <ul>
                {articles?.map((article) => {
                    return (
                        <div key={article.id}>
                            <DocumentNavLink
                                article={article}
                                documentUrl={documentUrl}
                            />
                            <ul>
                                {article.childs?.map((child) => {
                                    return (
                                        <li key={child.title}>
                                            <DocumentNavLink
                                                documentUrl={documentUrl}
                                                isChild
                                                article={child}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </ul>
        </nav>
    )
}

type LinkProps = {
    article: ArticleType
    documentUrl: string
    isChild?: boolean
}

const DocumentNavLink = ({
    article,
    documentUrl,
    isChild = false,
}: LinkProps) => {
    return (
        <Link
            href={`${documentUrl}/${article.idTitle}`}
            className={cn(
                'group my-2 flex flex-row items-center justify-between gap-x-2 overflow-hidden font-medium',
                isChild &&
                    'bprder my-0 ml-3 border-0 border-l py-1 pl-3 text-sm font-extralight text-muted-foreground',
            )}>
            {article.title}
        </Link>
    )
}
