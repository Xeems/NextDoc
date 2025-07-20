import React from 'react'

import { Avatar } from '../shadCn/ui/avatar'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../shadCn/ui/card'

export default function DocumentSkeleton({
    withFooter = true,
}: {
    withFooter?: boolean
}) {
    return (
        <Card className="flex h-fit w-full flex-col gap-y-1 rounded-md border border-solid border-border p-5 shadow-md">
            <CardHeader className=" p-0">
                <CardTitle className="h-fit">
                    <div className="h-3 w-40 animate-pulse rounded bg-gray-300" />
                </CardTitle>
            </CardHeader>
            <CardContent className="mb-1 space-y-1 p-0 py-2">
                <div className="h-2 w-1/2 animate-pulse rounded bg-gray-300 py-1"></div>
                <div className="h-2 w-1/2 animate-pulse rounded bg-gray-300 py-1"></div>
                <div className="h-2 w-1/3 animate-pulse rounded bg-gray-300 py-1"></div>
            </CardContent>
            {withFooter && (
                <CardFooter className="p-0 pt-2">
                    <div className="flex flex-row items-center gap-x-2">
                        <Avatar className="size-5 animate-pulse bg-gray-300"></Avatar>
                        <span className="h-2 w-10 animate-pulse rounded bg-gray-300" />
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}
