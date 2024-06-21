'use client'

import { useFormContext } from 'react-hook-form'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/shadCn/ui/form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/shadCn/ui/select'
import { Loader2Icon } from 'lucide-react'

type OptionType = {
    id: string
    name: string
}
type SelectFieldProps<T extends OptionType> = {
    name: string
    label: string
    options?: T[]
}

const RHFSelect = <T extends OptionType>({
    name,
    label,
    options,
}: SelectFieldProps<T>) => {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}>
                            <SelectTrigger className="w-full min-w-40">
                                <SelectValue placeholder="Select owner" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {options ? (
                                        options.map((option) => (
                                            <SelectItem
                                                key={option.id}
                                                value={option.id}>
                                                {option.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <Loader2Icon className="h-5 w-5 animate-spin" />
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage></FormMessage>
                </FormItem>
            )}
        />
    )
}

export default RHFSelect
