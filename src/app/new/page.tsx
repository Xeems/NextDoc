'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/shadCn/ui/select'
import { Separator } from '@/src/components/shadCn/ui/separator'
import { useUserWorkspacesQuery } from '@/src/hooks/querys/useUserWorkspaces'
import useDebounce from '@/src/hooks/useDebounce'
import { normalizeName } from '@/src/lib/utils'
import { createDocumentAction } from '@/src/server/actions/document/createDocument'
import { getDocumentAction } from '@/src/server/actions/document/getDocument'

export default function CreateUserDocumentPage() {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const { data: workspaces } = useUserWorkspacesQuery({
        username: session?.user.username,
        onlyGroups: false,
    })
    const form = useForm<NewDocumentType>({
        resolver: zodResolver(newDocumentSchema),
        defaultValues: {
            documentName: '',
            workspaceId: '',
            documentDescription: '',
            documentType: 'private',
        },
    })

    const docNameDebounce = useDebounce(form.watch('documentName'), 300)

    useEffect(() => {
        setLoading(true)
        ;(async () => {
            const worksapce = workspaces?.find((el) => {
                el.id == form.getValues('workspaceId')
            })
            const res = await getDocumentAction(
                worksapce?.name!,
                normalizeName(form.getValues('documentName')),
            )
            console.log(123)
            if (res.data?.document)
                form.setError('documentName', {
                    message:
                        'You already have a document in this workspace with the same name',
                })
            else {
                form.clearErrors('documentName')
            }
            setLoading(false)
        })()
    }, [docNameDebounce, form.getValues('workspaceId')])

    async function newDoucumentSubmit(data: NewDocumentType) {
        setLoading(true)
        console.log(data)
        const res = await createDocumentAction(data)
        if (res?.data) {
            toast.success('Document successfully created')
        }
        if (res?.error) {
            toast.error(res.error)
        }
        setLoading(false)
    }

    return (
        <div className="h-[calc(100% - 60px)] flex w-full flex-col items-center justify-stretch p-5 md:max-w-[40rem]">
            <h1 className="my-5 w-full text-2xl font-bold">
                Create new document
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(newDoucumentSubmit)}
                    className="w-full space-y-6">
                    <div className="inline-flex gap-x-4">
                        <FormField
                            control={form.control}
                            name="workspaceId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}>
                                            <SelectTrigger className="min-w-40">
                                                <SelectValue placeholder="Select owner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {workspaces?.map(
                                                        (owner) => (
                                                            <SelectItem
                                                                key={owner.name}
                                                                value={
                                                                    owner.id
                                                                }>
                                                                {owner.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
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
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>

                    {docNameDebounce && form.getValues('workspaceId') && (
                        <div className="inline-flex items-center gap-2 text-sm font-light">
                            {' '}
                            This document will be have link:{' '}
                            {!loading && normalizeName(docNameDebounce)}
                            {loading && (
                                <Loader2Icon className="size-4 animate-spin" />
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
                                                    This document can be seen by
                                                    anyone on the Internet
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
                                                    This document will only be
                                                    available to you
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
                        <Button type="submit" disabled={loading}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
