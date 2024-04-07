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
        <Card className="flex w-full h-fit flex-col gap-y-1 rounded-md border border-solid border-border p-5 shadow-md">
            <CardHeader className=" p-0">
                <CardTitle className="h-fit">
                    <div className="animate-pulse bg-gray-300 w-40 h-3 rounded" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 py-2 mb-1 space-y-1">
                <div className="animate-pulse bg-gray-300 w-1/2 h-2 rounded py-1"></div>
                <div className="animate-pulse bg-gray-300 w-1/2 h-2 rounded py-1"></div>
                <div className="animate-pulse bg-gray-300 w-1/3 h-2 rounded py-1"></div>
            </CardContent>
            {withFooter && (
                <CardFooter className="p-0 pt-2">
                    <div className="flex flex-row items-center gap-x-2">
                        <Avatar className="size-5 bg-gray-300 animate-pulse"></Avatar>
                        <span className="animate-pulse bg-gray-300 w-10 h-2 rounded" />
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}
