import React from 'react'
import { Skeleton } from '../shadCn/ui/skeleton'
import { Label } from '../shadCn/ui/label'

const InputSkeleton = ({ label }: { label?: string }) => {
    return (
        <div className="flex flex-col items-center gap-y-3">
            {label && <Label>{label}</Label>}
            <Skeleton className="flex h-10 w-full rounded-md border border-solid border-border bg-background-accent px-3 py-2" />
        </div>
    )
}

export default InputSkeleton
