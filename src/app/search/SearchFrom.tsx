'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, ChevronDownIcon, SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
    searchSchema,
    searchTargetValues,
    SearchType,
} from '@/@types/validators/search'
import { Button } from '@/src/components/shadCn/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/src/components/shadCn/ui/dropdown-menu'
import { Form, FormControl, FormField } from '@/src/components/shadCn/ui/form'
import { Input } from '@/src/components/shadCn/ui/input'

export const SearchFrom = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const form = useForm<SearchType>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchQuery: searchParams.get('query')?.toString() || '',
            searchTarget: 'documents',
        },
    })

    function searchSubmit(data: SearchType) {
        const params = new URLSearchParams()
        params.delete('query')
        params.delete('target')
        params.append('query', data.searchQuery)
        params.append('target', data.searchTarget)
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(searchSubmit)}
                className="flex w-full flex-row gap-x-2 ">
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => (
                        <FormControl className="w-full">
                            <Input
                                className="w-full bg-background-accent "
                                placeholder="Enter query"
                                {...field}
                            />
                        </FormControl>
                    )}
                />
                <FormField
                    control={form.control}
                    name="searchTarget"
                    render={({ field }) => (
                        <FormControl>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="capitalize"
                                        variant={'outline'}>
                                        Search target{' '}
                                        <ChevronDownIcon className="size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        Panel Position
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}>
                                        {searchTargetValues.map((value) => (
                                            <DropdownMenuRadioItem
                                                value={value}
                                                key={value}
                                                className="capitalize">
                                                {value}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </FormControl>
                    )}
                />
                <Button type="submit" className="gap-x-2">
                    Search <SearchIcon className="size-5" />
                </Button>
            </form>
        </Form>
    )
}

export default SearchFrom
