'use client'
import { Button } from '@/src/components/shadCn/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/src/components/shadCn/ui/card'
import { Input } from '@/src/components/shadCn/ui/input'

import updateNameAction from '@/src/server/actions/workspace/updateName'

import React from 'react'

type Props = {
    workspaceName: string
    workspaceId: string
}

const NameCard = ({ workspaceName, workspaceId }: Props) => {
    const submitAction = async (data: FormData) => {
        const res = await updateNameAction(workspaceId, data)
    }
    return (
        <form action={submitAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Workspace name</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Name of the workspace, all users will see this name.
                    </CardDescription>
                    <Input
                        defaultValue={workspaceName}
                        id="nameInput"
                        name="name"
                        size={10}
                        placeholder="Workspace name"
                        className="my-4 max-w-[300px] bg-background"
                    />
                </CardContent>
                <CardFooter className="items-center justify-end border-0 border-t bg-background">
                    <Button type="submit" size={'sm'}>
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default NameCard
