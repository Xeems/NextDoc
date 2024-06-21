import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'

type Props = {
    articles: ArticleType[]
    parent?: ArticleType
}
const SortableList = ({ articles, parent }: Props) => {
    return (
        <SortableContext
            items={articles.map((article) => article.id)}
            strategy={verticalListSortingStrategy}>
            <ul className="h-[fit-content + 20px] flex flex-col gap-y-2 py-2">
                {articles &&
                    articles.map((article) => (
                        <SortableItem
                            key={article.id}
                            parent={parent}
                            article={article}
                        />
                    ))}
            </ul>
        </SortableContext>
    )
}

export default SortableList
