'use client'

import {
    newDocumentSchema,
    NewDocumentType,
} from '@/@types/validators/document'
import { Button } from '@/src/components/shadCn/ui/button'
import { ContextMenuRadioGroup } from '@/src/components/shadCn/ui/context-menu'
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/src/components/shadCn/ui/select'
import { Separator } from '@/src/components/shadCn/ui/separator'
import { usePossibleDocumentOwnersQuery } from '@/src/hooks/querys/usePossibleDocumentOwnersQuery'
import useDebounce from '@/src/hooks/useDebounce'
import { normalizeName } from '@/src/lib/utils'
import { checkUniqueDocumentNameAction } from '@/src/server/actions/document/checkUniqueDocumentName'
import { createDocumentAction } from '@/src/server/actions/document/createDocument'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function CreateUserDocumentPage() {
    const { data: possibleOwners } = usePossibleDocumentOwnersQuery()
    const form = useForm<NewDocumentType>({
        resolver: zodResolver(newDocumentSchema),
        defaultValues: {
            documentName: '',
            documentOwner: {
                name: '',
                type: 'user',
            },
            documentDescription: '',
            documentType: 'private',
        },
    })

    const docNameDebounce = useDebounce(form.watch('documentName'), 300)

    useEffect(() => {
        ;(async () => {
            if (docNameDebounce !== '') {
                const res = await checkUniqueDocumentNameAction({
                    documentOwner: form.getValues('documentOwner'),
                    documentName: normalizeName(docNameDebounce),
                })
                if (res.data === false)
                    form.setError('documentName', {
                        message:
                            'You already have a document with the same name',
                    })
                else form.clearErrors('documentName')
            }
        })()
    }, [docNameDebounce, form.getValues('documentOwner')])

    async function newDoucumentSubmit(data: NewDocumentType) {
        console.log(data)
        // const res = await createDocumentAction({ data })
        // if (res?.data) {
        //     toast.success('Document successfully created')
        // }
        // if (res?.error) {
        //     toast.error(res.error)
        // }
    }

    return (
        <div className="w-full md:max-w-[40rem] p-5 h-[calc(100% - 60px)] flex items-center flex-col justify-stretch">
            <h1 className="w-full text-2xl my-5 font-bold">
                Create new document
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(newDoucumentSubmit)}
                    className="space-y-6 w-full">
                    <div className="inline-flex gap-x-4">
                        <FormField
                            control={form.control}
                            name="documentOwner.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <SelectTrigger className="min-w-40">
                                                <SelectValue placeholder="Select owner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {possibleOwners?.map(
                                                    (owner) => (
                                                        <SelectItem
                                                            key={owner.name}
                                                            value={owner.name}>
                                                            {owner.name}
                                                        </SelectItem>
                                                    ),
                                                )}
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
                                                <p className="text-muted-foreground text-sm font-light">
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
                                                <p className="text-muted-foreground text-sm font-light">
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
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
