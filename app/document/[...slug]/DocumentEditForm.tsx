'use client'

import Editor from '@/components/Editor'
import { Button } from '@/components/shadCn/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from '@/components/shadCn/ui/form'
import { updateAricleContentAction } from '@/server/actions/article/updateAricleContent'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formData = z.object({
    content: z.any(),
})

type Props = {
    article: ArticleType
}

export default function DocumentEditForm({ article }: Props) {
    const form = useForm<z.infer<typeof formData>>({
        resolver: zodResolver(formData),
    })

    const onSubmit = async (data: z.infer<typeof formData>) => {
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
                                <Editor
                                    initialValue={article.content}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="my-4">
                    Save changes
                </Button>
            </form>
        </Form>
    )
}
