import { notFound } from 'next/navigation'

import { Separator } from '@/src/components/shadCn/ui/separator'
import ReactMarkdown from '@/src/components/TextEditor/ReactMarkdown'
import { articleQuery } from '@/src/hooks/querys/useArticle'

import ArticleEditForm from './ArticleEditForm'

type Props = {
    params: {
        owner: string
        document: string
        slug?: string[]
    }
    searchParams?: {
        edit?: boolean
    }
}

export default async function DocumentPage({ params, searchParams }: Props) {
    const article = await articleQuery({
        documentName: params.document,
        articleTitle: params.slug ? params.slug.slice(-1)[0] : undefined,
    })

    if (!article) return <div>There is no articles in this document</div>

    return (
        <div className="flex h-fit w-full flex-col items-center">
            <h1 className="my-2 w-full text-start text-4xl font-semibold">
                {article?.title} {searchParams?.edit && '(edit)'}
            </h1>
            <Separator className="my-4" />
            {searchParams?.edit ? (
                <ArticleEditForm article={article} />
            ) : (
                <ReactMarkdown markdown={article?.content} />
            )}
        </div>
    )
}
