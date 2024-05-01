'use client'

import {
    newWorkspaceUserSchema,
    NewWorkspaceUserType,
} from '@/@types/validators/workspace'
import { Button } from '@/src/components/shadCn/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/src/components/shadCn/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/shadCn/ui/form'
import { Input } from '@/src/components/shadCn/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/src/components/shadCn/ui/select'
import UserCard from '@/src/components/UI/UserCard'
import { getUserAction } from '@/src/server/actions/user/getUser'
import { addUserToWorkspaceAction } from '@/src/server/actions/workspace/addUserToWorkspace'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { WorkspaceContext } from '../workspaceContext'

const newWorkspaceUserSchemaWithUsername = newWorkspaceUserSchema.extend({
    username: z.string(),
})
export function AddNewUserModal() {
    const workspaceContext = useContext(WorkspaceContext)
    const [user, setUser] = useState<UserType | null>(null)
    const form = useForm<z.infer<typeof newWorkspaceUserSchemaWithUsername>>({
        resolver: zodResolver(newWorkspaceUserSchemaWithUsername),
        defaultValues: {
            userId: user?.id,
            workspaceId: workspaceContext.workspaceId,
            role: 'BASE',
        },
    })

    //const { data: session } = useSession()
    const [isDialog, setDialog] = useState<boolean | undefined>(false)

    useEffect(() => {
        const data = getUserAction(form.getValues('username')).then((data) => {
            if (data.user) {
                setUser(data.user)
                form.setValue('userId', data.user.id)
            } else setUser(null)
        })
    }, [form.watch('username')])

    async function newDoucumentSubmit(data: NewWorkspaceUserType) {
        console.log(data)
        const res = await addUserToWorkspaceAction(data)
        console.log(res)
    }

    if (
        workspaceContext.userRole === 'BASE' ||
        workspaceContext.userRole === 'NONE' ||
        workspaceContext.userRole === undefined
    )
        return <></>

    return (
        <Dialog
            open={isDialog}
            onOpenChange={() => setDialog(!isDialog)}
            defaultOpen={isDialog}>
            <DialogTrigger asChild>
                <Button className="">
                    <Plus className="mr-3 h-5 w-5" />
                    New user
                </Button>
            </DialogTrigger>
            <DialogContent className="px-5">
                <DialogHeader>
                    <DialogTitle>Add user to workspace</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(newDoucumentSubmit)}
                        className="flex flex-col gap-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter document name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {user && <UserCard user={user} />}

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <SelectTrigger className="w-full border border-solid border-border">
                                            <SelectValue placeholder="Select a user role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    User role
                                                </SelectLabel>
                                                <SelectItem value="ADMIN">
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value="BASE">
                                                    Base
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => setDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
