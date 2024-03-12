import { cn } from "@/lib/utils";
import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";

type InputProps = {
    value?: string
    label?: string
    name?: string
    error?: string
    icon?: React.ReactNode
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
} & InputHTMLAttributes<HTMLInputElement>;

const UIInput = forwardRef<HTMLInputElement, InputProps>(function Comp({ label, error, icon, ...props }, ref) {
    return (
        <div className="flex flex-1 flex-col">
            {labelHeader(label)}
            <div className={cn(
                "w-full px-3 min-h-11 flex gap-x-2 items-center border border-solid rounded-lg bg-background focus-within:border-border",
                props.className
            )} >
                {inputIcon(icon)}
                <input
                    ref={ref}
                    {...props}
                    className='w-full h-full bg-transparent'
                />
            </div>
            {errorMessage(error)}
        </div>
    )
})

function labelHeader(label: string | undefined) {
    if (!label) return null

    else return <p className="mx-2 text-lg">{label}</p>
}

function inputIcon(icon: React.ReactNode | undefined) {
    if (!icon) return null
    else return icon
}

function errorMessage(error: string | undefined) {
    if (!error) return null

    else return <p className="mt-1 mx-2 text-sm text-destructive">{error}</p>
}

export default UIInput;