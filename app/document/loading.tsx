import React from 'react'

import EmptyDocument from './[owner]/[document]/[[...slug]]/EmptyDocument'

export default function Loading() {
    return (
        <>
            <div className="text-9xl w-full h-40">Loading...</div>
            <EmptyDocument />
        </>
    )
}
