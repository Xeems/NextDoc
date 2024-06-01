'use client'

import Link from 'next/link'

import { useArticlesQuery } from '@/src/hooks/querys/useArticles'
import { ROUTES } from '@/src/lib/routes'
import { cn } from '@/src/lib/utils'

import NewArticleForm from './NewArticleForm'

type Props = {
    document: DocType
}

export default function DocumentNav({ document }: Props) {
    const { data: articles, error } = useArticlesQuery(document.id)

    if (error) throw new Error('Something went wrong')
    const documentUrl = ROUTES.DOCUMENT(
        document.workspace?.name!,
        document.urlName,
    )

    return (
        <nav className="w-full transition-all delay-150 duration-300 md:w-80">
            <ul>
                {articles?.map((article) => {
                    return (
                        <li key={article.id}>
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
                        </li>
                    )
                })}
            </ul>
            <NewArticleForm articles={articles} document={document} />
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
            href={`${documentUrl}/${article.urlName}`}
            className={cn(
                'group my-2 flex flex-row items-center justify-between gap-x-2 overflow-hidden font-medium',
                isChild &&
                    'bprder my-0 ml-3 border-0 border-l py-1 pl-3 text-sm font-extralight text-muted-foreground',
            )}>
            {article.title}
        </Link>
    )
}
