'use client'

import { Button } from '@/components/shadCn/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadCn/ui/form'
import { Input } from '@/components/shadCn/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchSchema = z.object({
    searchQuery: z.string(),
})

type SearchType = z.input<typeof searchSchema>

function SearchFrom() {
    const form = useForm<SearchType>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchQuery: '',
        },
    })

    async function searchSubmit(data: SearchType) {}

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(searchSubmit)}
                className="w-full flex flex-row justify-center items-center gap-x-4">
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="bg-background-accent"
                                    placeholder="Enter query"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button>Search</Button>
            </form>
        </Form>
    )
}

export default SearchFrom
