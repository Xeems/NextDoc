'use client'

import React from 'react'
import { ChevronRightIcon } from 'lucide-react'

import { Button } from '@/src/components/shadCn/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/src/components/shadCn/ui/collapsible'
import useMediaQuery from '@/src/hooks/useMediaQuery'

export const MobileNavCollapsible = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return children
    }

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="w-full rounded-none">
            <CollapsibleTrigger asChild className="mx-0 px-0">
                <Button
                    variant="ghost"
                    className="mx-0 w-full justify-start gap-x-4 rounded-none">
                    <ChevronRightIcon className="size-4" /> Document content
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute h-full w-full rounded-none border bg-background p-5 ">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default MobileNavCollapsible
