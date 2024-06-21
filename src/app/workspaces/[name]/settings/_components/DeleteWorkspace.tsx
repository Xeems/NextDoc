import React from 'react'

import { Button } from '@/src/components/shadCn/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
} from '@/src/components/shadCn/ui/card'

const DeleteWorkspace = () => {
    return (
        <Card className="flex items-center justify-stretch border border-destructive/30 bg-background-destructive">
            <CardContent className="flex w-full flex-row items-center justify-between px-6 py-2">
                <CardDescription className="text-base ">Delete</CardDescription>
                <Button variant={'destructive'} size={'sm'}>
                    Delete workspace
                </Button>
            </CardContent>
        </Card>
    )
}

export default DeleteWorkspace
