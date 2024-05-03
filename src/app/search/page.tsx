'use client'

import { Button } from '@/src/components/shadCn/ui/button'
import { paginationSearchAction } from '@/src/server/actions/paginationSearch'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import React from 'react'

import SearchFrom from './SearchFrom'
import SearchResultCard from './SearchResultCard'

type TargetVariant = 'users' | 'documents' | 'workspaces'

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
        <div className="flex w-full flex-col items-center ">
            <div className="my-10  flex w-full justify-stretch px-5 lg:max-w-[70rem]">
                <SearchFrom />
            </div>

            <div className="mb-4 flex w-full flex-col justify-stretch gap-4 px-5 lg:max-w-[70rem]">
                {data.pages &&
                    data.pages.map((value, index, array) => {
                        return (
                            <React.Fragment key={index}>
                                {/* {value.data?.map((el) => (
                                    <SearchResultCard
                                        key={el.id}
                                        searchResult={el}
                                    />
                                ))} */}
                            </React.Fragment>
                        )
                    })}
            </div>
            {(isLoading || isFetchingNextPage) && (
                <div className="h-40 w-full">Loading...</div>
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
