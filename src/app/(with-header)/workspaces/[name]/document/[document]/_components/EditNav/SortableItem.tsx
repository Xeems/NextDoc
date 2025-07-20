import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'

import { Card } from '@/src/components/shadCn/ui/card'

const SortableItem = ({
    article,
    parent,
}: {
    article: ArticleType
    parent?: ArticleType
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        isDragging,
        transform,
        transition,
    } = useSortable({
        id: article.id as UniqueIdentifier,
    })

    const style = {
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition: transition || undefined,
    }

    return (
        <Card
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            style={style}
            data-dnd-id={article.id}
            data-dnd-type="item"
            className="flex h-fit min-h-10 w-full cursor-auto flex-col items-center justify-between rounded-md border bg-slate-100 px-4">
            <p>{article.title}</p>
            {article.children && !!!parent && (
                <ul>
                    {article.children.map((child) => (
                        <SortableItem
                            article={child}
                            key={child.id}
                            parent={article}
                        />
                    ))}
                </ul>
            )}
        </Card>
    )
}

export default SortableItem
