'use client'

import { Button } from '@/components/shadCn/ui/button'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import React from 'react'

import SearchFrom from './SearchFrom'

type TargetVariant = 'users' | 'documents' | 'teams'

type Props = {
    searchParams?: {
        query?: string
        target: TargetVariant
    }
}
function SearchPage({ searchParams = { target: 'documents' } }: Props) {
    console.log(searchParams.target)
    const { data, fetchNextPage, isLoading, hasNextPage } =
        useSuspenseInfiniteQuery({
            queryKey: ['search', searchParams.target, searchParams?.query],
            queryFn: async () => {
                await console.log(' ')
            },
            initialPageParam: 1,
            getNextPageParam: (allPages, lastPage) => {
                return lastPage.length == 10 ? 2 : undefined
            },
        })

    return (
        <div className="w-full flex flex-col items-center ">
            <div className="w-full  lg:max-w-[70rem] justify-stretch flex my-10 px-5">
                <SearchFrom />
            </div>

            <div>
                {data.pages.map((page, index) => (
                    <React.Fragment key={index}></React.Fragment>
                ))}
            </div>
            {isLoading && <div className="w-full h-40">Loading...</div>}
            <Button
                disabled={!hasNextPage}
                variant={'outline'}
                onClick={() => fetchNextPage()}>
                Load more
            </Button>
        </div>
    )
}

export default SearchPage
