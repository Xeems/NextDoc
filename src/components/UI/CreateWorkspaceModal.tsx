'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import {
    workspaceNameSchema,
    WorkspaceNameType,
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
import { createWorkspaceAction } from '@/src/server/actions/workspace/createWorkspace'

type Props = {
    children: React.ReactNode
}
export function CreateWorkspaceModal({ children }: Props) {
    const queryClient = useQueryClient()
    const [isDialog, setDialog] = useState<boolean | undefined>(false)
    const { data: session } = useSession()

    const form = useForm<WorkspaceNameType>({
        resolver: zodResolver(workspaceNameSchema),
        defaultValues: {
            name: '',
        },
    })

    async function createWorkspaceSubmit(data: WorkspaceNameType) {
        const res = await createWorkspaceAction({
            name: data.name,
            userId: session?.user.id,
        })
        if (res?.error) {
            toast.error(res?.error)
            return
        }

        if (res?.data) {
            queryClient.invalidateQueries({
                queryKey: ['teams', session?.user.id],
            })

            toast.success('Workspace succesefuly created')
            setDialog(false)
        }
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
                        onSubmit={form.handleSubmit(createWorkspaceSubmit)}
                        className="flex flex-col gap-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-normal">
                                        Workspace name
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
