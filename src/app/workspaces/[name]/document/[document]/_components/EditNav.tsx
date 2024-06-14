'use client'

import React, { useState } from 'react'
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd'

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

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const sourceIndex = result.source.index
        const destinationIndex = result.destination.index

        const updatedArticles = [...articles]
        const [movedArticle] = updatedArticles.splice(sourceIndex, 1)
        updatedArticles.splice(destinationIndex, 0, movedArticle)

        setArticles(updatedArticles)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Edit articles</DialogHeader>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="articles">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                {articles.map((article, index) => (
                                    <Draggable
                                        key={article.id}
                                        draggableId={article.id}
                                        index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="cursor-grab rounded p-2 hover:bg-zinc-900 active:cursor-grabbing">
                                                {article.title}
                                                {article.childs &&
                                                    article.childs.length >
                                                        0 && (
                                                        <ul className="pl-5">
                                                            {article.childs.map(
                                                                (
                                                                    child,
                                                                    childIndex,
                                                                ) => (
                                                                    <Draggable
                                                                        key={
                                                                            child.id
                                                                        }
                                                                        draggableId={
                                                                            child.id
                                                                        }
                                                                        index={
                                                                            childIndex
                                                                        }>
                                                                        {(
                                                                            provided,
                                                                        ) => (
                                                                            <li
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                className="cursor-grab rounded p-2 hover:bg-zinc-900 active:cursor-grabbing">
                                                                                {
                                                                                    child.title
                                                                                }
                                                                            </li>
                                                                        )}
                                                                    </Draggable>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </DialogContent>
        </Dialog>
    )
}

export default EditNav
