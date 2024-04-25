'use client'

import { searchSchema, SearchType } from '@/@types/validators/search'
import { Button } from '@/components/shadCn/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/shadCn/ui/dropdown-menu'
import { Form, FormControl, FormField } from '@/components/shadCn/ui/form'
import { Input } from '@/components/shadCn/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon, SearchIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const items = ['users', 'teams', 'documents']
export const SearchFrom = () => {
    const params = new URLSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const form = useForm<SearchType>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchQuery: params.get('query')?.toString(),
            searchOptions: [...items],
        },
    })

    function searchSubmit(data: SearchType) {
        params.set('query', data.searchQuery)
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(searchSubmit)}
                className="w-full flex flex-row gap-x-2 ">
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => (
                        <FormControl className="w-full">
                            <Input
                                className="bg-background-accent w-full"
                                placeholder="Enter query"
                                {...field}
                            />
                        </FormControl>
                    )}
                />
                <FormField
                    control={form.control}
                    name="searchOptions"
                    render={({ field }) => (
                        <FormControl>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        className="w-fit px-3 ">
                                        <ChevronDownIcon className=" h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Search by
                                    </DropdownMenuLabel>

                                    {items.map((item) => (
                                        <DropdownMenuCheckboxItem
                                            {...field}
                                            className="capitalize"
                                            key={item}
                                            checked={field.value?.includes(
                                                item,
                                            )}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([
                                                          ...field.value!,
                                                          item,
                                                      ])
                                                    : field.onChange(
                                                          field.value?.filter(
                                                              (value) =>
                                                                  value !==
                                                                  item,
                                                          ),
                                                      )
                                            }}>
                                            {item}
                                        </DropdownMenuCheckboxItem>
                                    ))}
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
