'use client'

import { useArticlesQuery } from '@/hooks/useArticlesQuery'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useContext } from 'react'

import { DocumentContext } from './[[...slug]]/DocumentContext'
import NewArticle from './[[...slug]]/newArticle'

type Props = {
    document: DocType
}

export default function DocumentNav({ document }: Props) {
    const documentContext = useContext(DocumentContext)
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
                                className="group text-sm my-2 flex flex-row items-center justify-between gap-x-2 overflow-hidden font-normal">
                                {article.title}
                            </Link>

                            <ul>
                                {article.childs?.map((child) => {
                                    return (
                                        <li
                                            key={child.title}
                                            className="group relative text-sm flex items-center py-2 font-light text-muted-foreground hover:text-foreground">
                                            <span className="absolute bottom-0 left-2 top-0 w-px bg-border" />
                                            <Link
                                                className="pl-7"
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
            {documentContext.userRole == 'ADMIN' ||
                (documentContext.userRole == 'OWNER' && (
                    <NewArticle articles={articles} document={document} />
                ))}
        </nav>
    )
}