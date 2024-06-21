import { ScrollArea } from '@/src/components/shadCn/ui/scroll-area'
import { getDocumentArticlesAction } from '@/src/server/data-layer/article'

import { DocumentNavLink } from './DocumentNavLink'
import EditNav from './EditNav/EditNav'
import NewArticleForm from './NewArticleForm'

type Props = {
    document: DocType
    workspaceName: string
}

const DocumentNav = async ({ document, workspaceName }: Props) => {
    const { data: articles, error } = await getDocumentArticlesAction(
        document.id,
    )

    if (error) throw new Error()
    return (
        <nav className="w-full transition-all md:w-80">
            <EditNav articleList={articles} />
            <ScrollArea>
                <ul>
                    {articles?.map((article) => {
                        return (
                            <li key={article.id}>
                                <DocumentNavLink
                                    article={article}
                                    document={document}
                                    workspaceName={workspaceName}
                                />
                                <ul>
                                    {article.childs?.map((child) => {
                                        return (
                                            <li key={child.title}>
                                                <DocumentNavLink
                                                    article={child}
                                                    document={document}
                                                    workspaceName={
                                                        workspaceName
                                                    }
                                                    parent={article}
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
