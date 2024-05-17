import { Button } from '@/src/components/shadCn/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
} from '@/src/components/shadCn/ui/card'
import React from 'react'

const DeleteWorkspace = () => {
    return (
        <Card className="bg-background-destructive flex items-center justify-stretch border border-destructive/30">
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
