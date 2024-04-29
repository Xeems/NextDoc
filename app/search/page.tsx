'use client'

import { Button } from '@/components/shadCn/ui/button'
import { paginationSearchAction } from '@/server/actions/paginationSearch'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import React from 'react'

import SearchFrom from './SearchFrom'
import SearchResultCard from './SearchResultCard'

type TargetVariant = 'users' | 'documents' | 'teams'

type Props = {
    searchParams?: {
        query?: string
        target?: TargetVariant
    }
}
function SearchPage({ searchParams = { target: 'documents' } }: Props) {
    const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
        useSuspenseInfiniteQuery({
            queryKey: ['search', searchParams.target, searchParams?.query],
            queryFn: (getNextPageParam) =>
                paginationSearchAction({
                    data: {
                        searchQuery: searchParams.query || '',
                        searchTarget: searchParams.target || 'documents',
                    },
                    page: getNextPageParam.pageParam,
                }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                const nextPage =
                    lastPage.data?.length == 10 ? allPages.length + 1 : 0
                return nextPage
            },
        })

    return (
        <div className="w-full flex flex-col items-center ">
            <div className="w-full  lg:max-w-[70rem] justify-stretch flex my-10 px-5">
                <SearchFrom />
            </div>

            <div className="w-full flex-col gap-4 lg:max-w-[70rem] justify-stretch flex px-5 mb-4">
                {data.pages &&
                    data.pages.map((value, index, array) => {
                        return (
                            <React.Fragment key={index}>
                                {value.data?.map((el) => (
                                    <SearchResultCard
                                        key={el.id}
                                        searchResult={el}
                                    />
                                ))}
                            </React.Fragment>
                        )
                    })}
            </div>
            {(isLoading || isFetchingNextPage) && (
                <div className="w-full h-40">Loading...</div>
            )}
            <Button
                disabled={!hasNextPage || isFetchingNextPage || isLoading}
                variant={'outline'}
                onClick={() => fetchNextPage()}>
                Load more
            </Button>
        </div>
    )
}

export default SearchPage
