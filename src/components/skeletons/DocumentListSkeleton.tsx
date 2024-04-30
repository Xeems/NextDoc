import React from 'react'

import DocumentSkeleton from './DocumentSkeleton'

export default function DocumentListSkeleton({ number }: { number: number }) {
    return (
        <div className="w-full @container">
            <div className="grid w-full grid-cols-1 gap-5 @[500px]:grid-cols-2  @[1000px]:grid-cols-3">
                {Array(number)
                    .fill(0)
                    .map((el, index) => {
                        return (
                            <DocumentSkeleton withFooter={false} key={index} />
                        )
                    })}
            </div>
        </div>
    )
}
