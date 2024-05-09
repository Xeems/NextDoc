'use client'

import React from 'react'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { Button } from '@/src/components/shadCn/ui/button'
import { paginationSearchAction } from '@/src/server/actions/paginationSearch'

import SearchFrom from './SearchFrom'
import SearchResultCard from './SearchResultCard'
import DocumentSearchCard from './DocumentSearchCard'
import { Separator } from '@/src/components/shadCn/ui/separator'

type TargetVariant = 'users' | 'documents' | 'workspaces'

type Props = {
    searchParams?: {
        q?: string
        t?: TargetVariant
    }
}

function SearchPage({ searchParams = { t: 'documents' } }: Props) {
    const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
        useSuspenseInfiniteQuery({
            queryKey: ['search', searchParams.t, searchParams?.q],
            queryFn: (getNextPageParam) =>
                paginationSearchAction({
                    data: {
                        searchQuery: searchParams.q || '',
                        searchTarget: searchParams.t || 'documents',
                    },
                    page: getNextPageParam.pageParam,
                }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                const nextPage =
                    lastPage.data?.length == 10
                        ? allPages.length + 1
                        : undefined
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
                                {value.data?.map((el) => (
                                    // <SearchResultCard
                                    //     key={el.id}
                                    //     searchResult={el}
                                    // />
                                    //@ts-ignore
                                    <DocumentSearchCard doc={el} />
                                ))}
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
