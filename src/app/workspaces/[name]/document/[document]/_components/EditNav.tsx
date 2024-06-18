'use client'

import React, { useState } from 'react'
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { Button } from '@/src/components/shadCn/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/src/components/shadCn/ui/dialog'

type Props = {
    articleList: ArticleType[]
}

const EditNav = ({ articleList }: Props) => {
    const [articles, setArticles] = useState(articleList)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const onDragEnd = (event: DragEndEvent) => {
        if (!event.active?.id || !event.over?.id) return

        if (event.active.id !== event.over.id) {
            setArticles((currentArticles) => {
                const oldIndex = currentArticles.findIndex(
                    (article) => article.id === event.active.id,
                )
                const newIndex = currentArticles.findIndex(
                    (article) => article.id === event.over?.id,
                )
                return arrayMove(currentArticles, oldIndex, newIndex)
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Edit articles</DialogHeader>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={onDragEnd}>
                    <SortableContext
                        items={articles.map((article) => article.id!)}
                        strategy={verticalListSortingStrategy}>
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </SortableContext>
                </DndContext>
            </DialogContent>
        </Dialog>
    )
}

const ArticleCard = ({ article }: { article: ArticleType }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: article.id!,
        })

    const style = {
        cursor: 'grab',
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition: transition || undefined,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex h-20 w-full items-center justify-between rounded-md border bg-slate-100 px-4">
            <p>{article.title}</p>
        </div>
    )
}

export default EditNav
