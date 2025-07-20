'use client'

import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

import {
    newDocumentSchema,
    NewDocumentType,
} from '@/@types/validators/document'
import { Button } from '@/src/components/shadCn/ui/button'
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
    RadioGroup,
    RadioGroupItem,
} from '@/src/components/shadCn/ui/radio-group'
import { Separator } from '@/src/components/shadCn/ui/separator'
import { createDocumentAction } from '@/src/server/actions/document/createDocument'

import RHFSelect from './RHFSelect'
import useCheckDocumentName from './useCheckDocumentName'

type Props = {
    workspaces: WorkspaceType[]
}

const NewDocumentForm = ({ workspaces }: Props) => {
    const form = useForm<NewDocumentType>({
        resolver: zodResolver(newDocumentSchema),
        defaultValues: {
            documentName: '',
            workspaceId: '',
            documentDescription: '',
            documentType: 'private',
        },
    })

    const nameWatch = useWatch({ name: 'documentName', control: form.control })
    const workspaceId = form.watch('workspaceId')

    const { loading, debouncedName, error } = useCheckDocumentName({
        name: nameWatch,
        workspaceId: workspaceId || '',
    })

    const isSubmitDisabled =
        form.formState.isSubmitting || loading || error ? true : false

    async function newDocumentSubmit(data: NewDocumentType) {
        const res = await createDocumentAction(data)

        if (res?.data) toast.success('Document successfully created')

        if (res?.error) toast.error(res.error)
    }

    return (
        <div className="h-[calc(100% - 60px)] flex w-full flex-col items-center justify-stretch p-5 md:max-w-[40rem]">
            <h1 className="my-5 w-full text-2xl font-bold">
                Create new document
            </h1>
            <FormProvider {...form}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(newDocumentSubmit)}
                        className="w-full space-y-6">
                        <div className="flex h-fit w-full flex-row items-start gap-x-4">
                            <RHFSelect
                                options={workspaces}
                                label="Owner"
                                name="workspaceId"
                            />

                            <FormField
                                control={form.control}
                                name="documentName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Document name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter document name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{error}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {form.getValues('documentName') &&
                            form.getValues('workspaceId') && (
                                <div className="inline-flex items-center gap-2 text-sm font-light">
                                    This document will be have link:{' '}
                                    {loading ? (
                                        <Loader2Icon className="size-4 animate-spin" />
                                    ) : (
                                        debouncedName
                                    )}
                                </div>
                            )}

                        <FormField
                            control={form.control}
                            name="documentDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter document description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator />
                        <FormField
                            control={form.control}
                            name="documentType"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>
                                        Select the visibility of this document
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1">
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="public" />
                                                </FormControl>
                                                <FormLabel className="font-medium">
                                                    Public
                                                    <p className="text-sm font-light text-muted-foreground">
                                                        This document can be
                                                        seen by anyone on the
                                                        Internet
                                                    </p>
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="private" />
                                                </FormControl>
                                                <FormLabel className="font-medium ">
                                                    Private
                                                    <p className="text-sm font-light text-muted-foreground">
                                                        This document will only
                                                        be available to you
                                                    </p>
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator />
                        <div className="space-x-2">
                            <Button variant="secondary" type="button">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitDisabled}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    )
}

export default NewDocumentForm
