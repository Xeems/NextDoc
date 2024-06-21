import { useSortable } from '@dnd-kit/sortable'

import { Card } from '@/src/components/shadCn/ui/card'

import SortableList from './SortableList'

const SortableItem = ({
    article,
    parent,
}: {
    article: ArticleType
    parent?: ArticleType
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: article.id,
        })

    const style = {
        cursor: 'grab',
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition: transition || undefined,
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex h-fit min-h-10 w-full cursor-auto flex-col items-center justify-between rounded-md border bg-slate-100 px-4">
            <p>{article.title}</p>
            {!!!parent && (
                <div className="h-fit w-full">
                    <SortableList parent={article} articles={article.childs} />
                </div>
            )}
        </Card>
    )
}

export default SortableItem
