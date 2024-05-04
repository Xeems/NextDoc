'use client'

import { useContext } from 'react'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { useArticlesQuery } from '@/src/hooks/querys/useArticles'

import { WorkspaceContext } from '../../WorkspaceContext'

import NewArticle from './newArticle'

type Props = {
    document: DocType
}

export default function DocumentNav({ document }: Props) {
    const documentContext = useContext(WorkspaceContext)
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
                                href={`/workspaces/${document.workspace?.name}/document/${document.idName}/${article.idTitle}`}
                                className="group my-2 flex flex-row items-center justify-between gap-x-2 overflow-hidden text-sm font-normal">
                                {article.title}
                                <Link
                                    href={`/workspaces/${document.workspace?.name}/document/${document.idName}/edit/${article.idTitle}`}>
                                    <Edit className="invisible ml-auto size-4 group-hover:visible" />
                                </Link>
                            </Link>

                            <ul>
                                {article.childs?.map((child) => {
                                    return (
                                        <li
                                            key={child.title}
                                            className="group relative flex items-center py-2 text-sm font-light text-muted-foreground hover:text-foreground">
                                            <span className="absolute bottom-0 left-2 top-0 w-px bg-border" />
                                            <div className=" flex w-full flex-row items-center justify-between">
                                                <Link
                                                    className="pl-7"
                                                    href={`/workspaces/${document.workspace?.name}/document/${document.idName}/${article.idTitle}/${child.idTitle}`}>
                                                    {child.title}
                                                </Link>
                                                <Link
                                                    href={`/workspaces/${document.workspace?.name}/document/${document.idName}/edit/${article.idTitle}/${child.idTitle}`}>
                                                    <Edit className="invisible ml-auto  size-4 group-hover:visible" />
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
            {documentContext.userRole == 'ADMIN' ||
                (documentContext.userRole == 'OWNER' && (
                    <NewArticle articles={articles} document={document} />
                ))}
        </nav>
    )
}
