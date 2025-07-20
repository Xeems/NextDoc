import { createPortal } from 'react-dom'
import { DragOverlay, UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'

type Props = {
    articles: ArticleType[]
}
const SortableList = ({ articles }: Props) => {
    return (
        <SortableContext
            items={articles.map((article) => article.id as UniqueIdentifier)}
            strategy={verticalListSortingStrategy}>
            <ul className="flex flex-col gap-y-2 py-2">
                {articles &&
                    articles.map((article) => (
                        <SortableItem key={article.id} article={article} />
                    ))}
            </ul>
            {createPortal(
                <DragOverlay>
                    {activeId && activeItem ? (
                        <SortableItem item={activeItem} isPlaceholder />
                    ) : null}
                </DragOverlay>,
                document.body,
            )}
        </SortableContext>
    )
}

export default SortableList
