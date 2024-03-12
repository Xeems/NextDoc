'use client'

import { newArticleSchema, newArticleType } from '@/@types/validators/article'
import { Button } from '@/components/shadCn/ui/button'
import { Checkbox } from '@/components/shadCn/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/shadCn/ui/dialog'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadCn/ui/form'
import { Input } from '@/components/shadCn/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/shadCn/ui/select'
import { createArticleAction } from '@/server/actions/article/createArticle'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

type Props = {
    articles: ArticleType[] | undefined
    document: DocType
}

export default function NewArticle({ articles, document }: Props) {
    const form = useForm<newArticleType>({
        resolver: zodResolver(newArticleSchema),
        defaultValues: {
            title: '',
            haveParent: false,
            parentArticleId: undefined,
        },
    })
    const haveParent = form.watch('haveParent')

    const onSubmit = async (data: newArticleType) => {
        const res = await createArticleAction(data, document?.id!)
        if (res.error) {
            toast.error(res.error)
        } else if (res.data) {
            toast.success('success')
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="mx-auto flex items-center justify-between gap-x-2">
                New artcile <PlusIcon className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent className="bg-background-accent">
                <DialogHeader>
                    <DialogTitle>New artcile</DialogTitle>
                    <DialogDescription>
                        This action will create a new article in this document.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Article title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Article title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-3 rounded-md border border-solid border-border p-4">
                            <FormField
                                control={form.control}
                                name="haveParent"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Have a parent</FormLabel>
                                            <FormDescription>
                                                The article you create will be a
                                                child of another article.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {haveParent && (
                                <FormField
                                    control={form.control}
                                    name="parentArticleId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }>
                                                    <SelectTrigger className="border border-solid border-border">
                                                        <SelectValue placeholder="Select a article" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Articles
                                                            </SelectLabel>
                                                            {articles?.map(
                                                                (article) => {
                                                                    return (
                                                                        <SelectItem
                                                                            key={
                                                                                article.id
                                                                            }
                                                                            value={
                                                                                article.id!
                                                                            }>
                                                                            {
                                                                                article.title
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                },
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <Button>Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
