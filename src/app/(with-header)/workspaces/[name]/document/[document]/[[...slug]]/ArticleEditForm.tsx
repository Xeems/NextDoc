'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from '@/src/components/shadCn/ui/form'
import { MarkdownEditor } from '@/src/components/TextEditor/MarkdownEditor'
import { updateAricleContentAction } from '@/src/server/actions/article/updateAricleContent'

const formData = z.object({
    content: z.string(),
})

type Props = {
    article: ArticleType
}

export default function ArticleEditForm({ article }: Props) {
    const form = useForm<z.infer<typeof formData>>({
        resolver: zodResolver(formData),
        defaultValues: {
            content: article.content!,
        },
    })

    const onSubmit = async (data: z.infer<typeof formData>) => {
        const res = await updateAricleContentAction(article.id!, data.content)
        if (res.data) toast.success('Article updated')
        else toast.error(res.error)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <MarkdownEditor {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
