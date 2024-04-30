'use client'

import { newTeamUserSchema, newTeamUserType } from '@/@types/validators/team'
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
import { addUserToTeamAction } from '@/src/server/actions/team/addUserToTeam'
import { getUserAction } from '@/src/server/actions/user/getUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { TeamContext } from '../TeamContext'

const newTeamUserSchemaWithUsername = newTeamUserSchema.extend({
    username: z.string(),
})
export function AddNewUserModal() {
    const teamContext = useContext(TeamContext)
    const [user, setUser] = useState<UserType | null>(null)
    const form = useForm<z.infer<typeof newTeamUserSchemaWithUsername>>({
        resolver: zodResolver(newTeamUserSchemaWithUsername),
        defaultValues: {
            userId: user?.id,
            teamId: teamContext.teamId,
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

    async function newDoucumentSubmit(data: newTeamUserType) {
        console.log(data)
        const res = await addUserToTeamAction(data)
        console.log(res)
    }

    if (
        teamContext.userRole === 'BASE' ||
        teamContext.userRole === 'NONE' ||
        teamContext.userRole === undefined
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
                    <DialogTitle>Add user to team</DialogTitle>
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
