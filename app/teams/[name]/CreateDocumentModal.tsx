'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/shadCn/ui/dialog'
import { Plus } from 'lucide-react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadCn/ui/form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
    NewDocumentType,
    newDocumentSchema,
} from '@/@types/validators/document'
import { zodResolver } from '@hookform/resolvers/zod'
import { createDocumentAction } from '@/server/actions/document/createDocument'
import { Input } from '@/components/shadCn/ui/input'
import { Textarea } from '@/components/shadCn/ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/shadCn/ui/select'
import { Button } from '@/components/shadCn/ui/button'
import { useContext, useState } from 'react'
import { TeamContext } from './TeamContext'

export function CreateDocumentModal() {
    const teamContext = useContext(TeamContext)

    const [isDialog, setDialog] = useState<boolean | undefined>(false)

    const form = useForm<NewDocumentType>({
        resolver: zodResolver(newDocumentSchema),
        defaultValues: {
            teamId: teamContext.teamId,
            documentName: '',
            documentDescription: '',
            documentType: 'private',
        },
    })

    async function newDoucumentSubmit(data: NewDocumentType) {
        const response = await createDocumentAction({ data })

        if (response?.error) {
            toast.error(response.error)
        }
        if (response?.data) {
            setDialog(false)
            toast.success('Document succesefuly created')
        }
    }

    if (teamContext.userRole === 'BASE' || teamContext.userRole === 'NONE')
        return <></>

    return (
        <Dialog
            open={isDialog}
            onOpenChange={() => setDialog(!isDialog)}
            defaultOpen={isDialog}>
            <DialogTrigger asChild>
                <Button className="min-w-fit px-2">
                    <Plus className="mr-1 h-5 w-5" />
                    <span>New document</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="px-5">
                <DialogHeader>
                    <DialogTitle>New document</DialogTitle>
                    <DialogDescription>
                        Describe the document you want to create.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(newDoucumentSubmit)}
                        className="flex flex-col gap-y-6">
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
                                    <FormMessage />
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
                                        <Textarea
                                            rows={3}
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

                        <DialogFooter>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => setDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
