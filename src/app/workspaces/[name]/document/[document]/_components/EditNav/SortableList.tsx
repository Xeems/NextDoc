import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'

type Props = {
    articles: ArticleType[]
    parent?: ArticleType
}
const SortableList = ({ articles, parent }: Props) => {
    if (!articles) return null
    return (
        <SortableContext
            items={articles.map((article) => article.id)}
            strategy={verticalListSortingStrategy}>
            {articles &&
                articles.map((article) => (
                    <SortableItem
                        key={article.id}
                        parent={parent}
                        article={article}
                    />
                ))}
        </SortableContext>
    )
}

export default SortableList
