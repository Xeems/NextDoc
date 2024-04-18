'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from '@/components/shadCn/ui/form'
import { MarkdownEditor } from '@/components/TextEditor/MarkdownEditor'
import { updateAricleContentAction } from '@/server/actions/article/updateAricleContent'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
        console.log(data)
        const res = await updateAricleContentAction(article.id!, data.content)
        if (res.data) toast.success('123')
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
