'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getDocumentArticlesQuery } from '@/src/server/data-layer/article'
import { DndContext, DragEndEvent } from '@dnd-kit/core'

const DargNDropPlayground = () => {
    const { data } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await getDocumentArticlesQuery(
                'clw4zwfxf0001v4wcxwc1i9a7',
            )
            if (res.error) throw new Error(res.error)
            else return res.data
        },
    })

    useEffect(() => {
        setArticles(data)
    }, [data])

    // ///////////////////////////////////

    const [articles, setArticles] = useState(data)

    const handleDragEnd = (event: DragEndEvent) => {}

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex h-screen w-full flex-col items-center justify-center bg-blue-400 text-black">
                {articles?.map((article) => {
                    return <div key={article.id}>{article.title}</div>
                })}
            </div>
        </DndContext>
    )
}

export default DargNDropPlayground
