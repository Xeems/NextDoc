'use client'

import { newTeamSchema, NewTeamType } from '@/@types/validators/team'
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
import { createTeamAction } from '@/src/server/actions/team/createTeam'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
    children: React.ReactNode
}
export function CreateTeamModal({ children }: Props) {
    const queryClient = useQueryClient()
    const [isDialog, setDialog] = useState<boolean | undefined>(false)
    const { data: session } = useSession()

    const form = useForm<NewTeamType>({
        resolver: zodResolver(newTeamSchema),
        defaultValues: {
            name: '',
        },
    })

    async function createTeamSubmit(data: NewTeamType) {
        const res = await createTeamAction({
            name: data.name,
            userId: session?.user.id,
        })
        if (res?.error) toast.error(res?.error)
        queryClient.invalidateQueries({ queryKey: ['teams', session?.user.id] })
        setDialog(false)
        toast.success('Succesefuly created')
    }

    return (
        <Dialog
            open={isDialog}
            onOpenChange={() => setDialog(!isDialog)}
            defaultOpen={isDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="border-solid border-border">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Create team</DialogTitle>
                    <DialogDescription>
                        Create your own team where you can share documents
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(createTeamSubmit)}
                        className="flex flex-col gap-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-normal">
                                        Team name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-background-accent"
                                            placeholder="Enter team name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                variant="outline"
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
