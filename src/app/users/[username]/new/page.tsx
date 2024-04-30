'use client'

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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/src/components/shadCn/ui/select'
import { Textarea } from '@/src/components/shadCn/ui/textarea'
import useDebounce from '@/src/hooks/useDebounce'
import { normalizeName } from '@/src/lib/utils'
import { checkUniqueDocumentNameAction } from '@/src/server/actions/document/checkUniqueDocumentName'
import { createDocumentAction } from '@/src/server/actions/document/createDocument'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function CreateUserDocumentPage() {
    const form = useForm<NewDocumentType>({
        resolver: zodResolver(newDocumentSchema),
        defaultValues: {
            documentName: '',
            documentDescription: '',
            documentType: 'private',
        },
    })

    const docNameDebounce = useDebounce(form.watch('documentName'), 300)

    useEffect(() => {
        ;(async () => {
            if (docNameDebounce !== '') {
                const res = await checkUniqueDocumentNameAction(
                    normalizeName(docNameDebounce),
                )
                if (res.data === false)
                    form.setError('documentName', {
                        message:
                            'You already have a document with the same name',
                    })
                else form.clearErrors('documentName')
            }
        })()
    }, [docNameDebounce, form.getValues('documentName')])

    const queryClient = useQueryClient()

    async function newDoucumentSubmit(data: NewDocumentType) {
        const res = await createDocumentAction({ data })
        if (res?.data) {
            await queryClient.invalidateQueries({
                queryKey: ['user', 'Roman', 'documents'],
            })
            toast.success('Document successfully created')
        }
        if (res?.error) {
            toast.error(res.error)
        }
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

                    <FormField
                        control={form.control}
                        name="documentDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Document description</FormLabel>
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

                    <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Document type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <SelectTrigger className="w-full border border-solid border-border">
                                        <SelectValue placeholder="Select a document type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Document type
                                            </SelectLabel>
                                            <SelectItem value="public">
                                                public
                                            </SelectItem>
                                            <SelectItem value="private">
                                                private
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button variant="secondary" type="button">
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
