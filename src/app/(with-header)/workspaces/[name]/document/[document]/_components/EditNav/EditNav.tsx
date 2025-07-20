'use client'

import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import {
    closestCorners,
    DndContext,
    DragCancelEvent,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { Button } from '@/src/components/shadCn/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/src/components/shadCn/ui/dialog'

import SortableItem from './SortableItem'
import SortableList from './SortableList'
import Tree from './Tree'

const flattenArticles = (articles: ArticleType[], parentId?: string) => {
    let flatArticles: ArticleType[] = []

    for (const article of articles) {
        flatArticles.push({ ...article, children: undefined, parentId })
        if (article.children && article.children.length > 0) {
            flatArticles = flatArticles.concat(
                flattenArticles(article.children, article.id),
            )
        }
    }
    return flatArticles
}

const deepenData = (flatArticles: ArticleType[], parentId = null) => {
    const nestedArticles: ArticleType[] = []

    Array.from(flatArticles).forEach((item) => {
        const allChildren = flatArticles.filter(
            (dataItem) => dataItem.parentId === item.id,
        )
        if (!item.parentId) {
            nestedArticles.push({
                ...item,
                children: allChildren.length ? allChildren : undefined,
            })
        }
    })
    return nestedArticles
}

type Props = {
    articleList: ArticleType[]
}

const EditNav = ({ articleList }: Props) => {
    const [articles, setArticles] = useState<ArticleType[]>(articleList)
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )
    const flattenedItems = flattenArticles(articles)

    const activeItem = activeId
        ? flattenedItems.find(({ id, children }) => id === activeId)
        : undefined

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event?.active?.id)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        if (active?.id !== over?.id) {
            const oldIndex = flattenedItems.findIndex(
                (item) => item.id === active.id,
            )
            const newIndex = flattenedItems.findIndex(
                (item) => item.id === over.id,
            )
            const newItems = Array.from(flattenedItems)
            const itemAtNewIndex = newItems[newIndex]

            // If an item is dragged inside itself, don't move it
            if (itemAtNewIndex?.parentId === activeItem?.id) {
                return
            }
            const [movedItem] = newItems.splice(oldIndex, 1)

            if (itemAtNewIndex?.parentId) {
                newItems.splice(newIndex, 0, {
                    ...movedItem,
                    parentId: itemAtNewIndex?.parentId,
                })
            } else {
                newItems.splice(newIndex, 0, { ...movedItem, parentId: null })
            }
            const newData = deepenData(newItems)
            setArticles(newData)
        }
        setActiveId(null)
    }

    function handleDragCancel(event: DragCancelEvent): void {
        setActiveId(null)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Edit articles</DialogHeader>
                <Tree articles={articles} />
                {/* <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragCancel={handleDragCancel}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}>
                    <SortableContext
                        items={articles.map(
                            (article) => article.id as UniqueIdentifier,
                        )}
                        strategy={verticalListSortingStrategy}>
                        <ul className="flex flex-col gap-y-2 py-2">
                            {articles &&
                                articles.map((article) => (
                                    <SortableItem
                                        key={article.id}
                                        article={article}
                                    />
                                ))}
                        </ul>
                        {createPortal(
                            <DragOverlay>
                                {activeId && activeItem ? (
                                    <SortableItem article={activeItem} />
                                ) : null}
                            </DragOverlay>,
                            document.body,
                        )}
                    </SortableContext>
                </DndContext> */}
            </DialogContent>
        </Dialog>
    )
}

export default EditNav
