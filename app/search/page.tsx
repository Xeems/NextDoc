'use client'

import { Button } from '@/components/shadCn/ui/button'
import { paginationSearchAction } from '@/server/actions/paginationSearch'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { undefined } from 'zod'

import SearchFrom from './SearchFrom'

type TargetVariant = 'users' | 'documents' | 'teams'

type Props = {
    searchParams?: {
        query?: string
        target?: TargetVariant
    }
}
function SearchPage({ searchParams = { target: 'documents' } }: Props) {
    const { data, fetchNextPage, isLoading, hasNextPage } =
        useSuspenseInfiniteQuery({
            queryKey: ['search', searchParams.target, searchParams?.query],
            queryFn: async (getNextPageParam) => {
                return await paginationSearchAction({
                    data: {
                        searchQuery: searchParams.query || '',
                        searchTarget: searchParams.target || 'documents',
                    },
                    page: getNextPageParam.pageParam,
                })
            },
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

            <div>
                {/* {data.pages.map((page: DocType[]) => (
                    <React.Fragment>
                        {page.map((doc) => {
                            return <></>
                        })}
                    </React.Fragment>
                ))} */}
                {data.pages.map((value, index, array) => {
                    console.log(array)

                    return (
                        <React.Fragment key={index}>
                            {/* {value.map((val) => (
                            <div>{val}</div>
                        ))} */}
                        </React.Fragment>
                    )
                })}
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
