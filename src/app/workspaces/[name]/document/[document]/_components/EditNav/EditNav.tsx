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
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { Button } from '@/src/components/shadCn/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/src/components/shadCn/ui/dialog'

import SortableList from './SortableList'

type Props = {
    articleList: ArticleType[]
}

const EditNav = ({ articleList }: Props) => {
    const [articles, setArticles] = useState<ArticleType[]>(articleList)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const findArticleById = (
        id: string,
        list: ArticleType[],
    ): [ArticleType | undefined, ArticleType[], number] => {
        for (let i = 0; i < list.length; i++) {
            const article = list[i]
            if (article.id === id) {
                return [article, list, i]
            }
            if (article.childs) {
                const [found, parentList, index] = findArticleById(
                    id,
                    article.childs,
                )
                if (found) {
                    return [found, parentList, index]
                }
            }
        }
        return [undefined, [], -1]
    }

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!active?.id || !over?.id || active.id === over.id) return

        setArticles((currentArticles) => {
            const newArticles = JSON.parse(JSON.stringify(currentArticles))

            const [activeArticle, activeList, activeIndex] = findArticleById(
                active.id,
                newArticles,
            )
            const [overArticle, overList, overIndex] = findArticleById(
                over.id,
                newArticles,
            )

            if (activeArticle && activeList && overArticle && overList) {
                activeList.splice(activeIndex, 1)

                if (overArticle.childs) {
                    // Add as the first child of the over article
                    overArticle.childs.unshift(activeArticle)
                } else {
                    // Add to the same list, before the over article
                    overList.splice(overIndex, 0, activeArticle)
                }
            }
            console.log(newArticles)

            return newArticles
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent className="h-[fit + 20px]">
                <DialogHeader>Edit articles</DialogHeader>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={onDragEnd}>
                    <SortableList articles={articles} />
                </DndContext>
            </DialogContent>
        </Dialog>
    )
}

export default EditNav
