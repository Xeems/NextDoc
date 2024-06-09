import { ScrollArea } from '@/src/components/shadCn/ui/scroll-area'
import { ROUTES } from '@/src/lib/routes'
import { getDocumentArticlesAction } from '@/src/server/actions/article/getDocumentArticles'

import { DocumentNavLink } from './DocumentNavLink'
import NewArticleForm from './NewArticleForm'

type Props = {
    document: DocType
    workspaceName: string
}

const DocumentNav = async ({ document, workspaceName }: Props) => {
    const { data: articles, error } = await getDocumentArticlesAction(
        document.id,
    )
    if (error || !articles) throw new Error()
    return (
        <nav className="w-full transition-all md:w-80">
            <ScrollArea>
                <ul>
                    {articles?.map((article) => {
                        return (
                            <li key={article.id}>
                                <DocumentNavLink
                                    title={article.title}
                                    href={ROUTES.DOCUMENT_ARTICLE(
                                        workspaceName,
                                        document.urlName,
                                        [article.urlName],
                                    )}
                                />
                                <ul>
                                    {article.childs?.map((child) => {
                                        return (
                                            <li key={child.title}>
                                                <DocumentNavLink
                                                    href={ROUTES.DOCUMENT_ARTICLE(
                                                        workspaceName,
                                                        document.urlName,
                                                        [
                                                            article.urlName,
                                                            child.urlName,
                                                        ],
                                                    )}
                                                    isChild
                                                    title={child.title}
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
            </ScrollArea>
        </nav>
    )
}

export default DocumentNav
