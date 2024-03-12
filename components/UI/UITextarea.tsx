import { cn } from "@/lib/utils";
import { ChangeEvent, TextareaHTMLAttributes, forwardRef } from "react";

type TextareaProps = {
    value?: string
    label?: string
    name?: string
    error?: string
    rowsCount?: number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const UITextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Comp({ label, error, rowsCount = 3, ...props }, ref) {
    return (
        <div className="flex flex-1 flex-col">
            {labelHeader(label)}
            <textarea
                rows={rowsCount}
                ref={ref}
                {...props}
                className={cn(
                    "w-full px-3 py-3 min-h-11 flex gap-x-2 items-center border border-solid rounded-lg bg-background focus:border-border",
                    props.className
                )}
            />
            {errorMessage(error)}
        </div>
    )
})

function labelHeader(label: string | undefined) {
    if (!label) return null

    else return <p className="mx-2 text-lg">{label}</p>
}

function errorMessage(error: string | undefined) {
    if (!error) return null

    else return <p className=" mt-1 mx-2 text-sm text-destructive">{error}</p>
}

export default UITextarea;