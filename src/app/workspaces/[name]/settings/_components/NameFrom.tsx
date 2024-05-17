'use client'
import {
    WorkspaceNameType,
    workspaceNameSchema,
} from '@/@types/validators/workspace'
import { Button } from '@/src/components/shadCn/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/src/components/shadCn/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/src/components/shadCn/ui/form'
import { Input } from '@/src/components/shadCn/ui/input'

import updateNameAction from '@/src/server/actions/workspace/updateName'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'

type Props = {
    workspaceName: string
    workspaceId: string
}

const NameForm = ({ workspaceName, workspaceId }: Props) => {
    const form = useForm<WorkspaceNameType>({
        resolver: zodResolver(workspaceNameSchema),
        defaultValues: {
            name: workspaceName,
        },
    })

    const onSubmit = async (data: WorkspaceNameType) => {
        await updateNameAction(workspaceId, data.name)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Workspace name</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    Name of the workspace, all users will see this name.
                </CardDescription>
                <Form {...form}>
                    <form
                        id="nameForm"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={
                                                form.formState.isSubmitting
                                            }
                                            className="my-4 max-w-[300px] bg-background"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="items-center justify-between border-0 border-t bg-background">
                <CardDescription className="text-muted-foreground">
                    The name must contain between 5 and 30 characters.
                </CardDescription>

                <Button
                    type="submit"
                    form="nameForm"
                    size={'sm'}
                    disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}

export default NameForm
