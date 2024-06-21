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
import { cn } from '@/src/lib/utils'

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
            <CollapsibleTrigger asChild className="">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-x-4 rounded-none text-base">
                    <ChevronRightIcon
                        className={cn('size-4', open && 'rotate-90')}
                    />
                    Navigation
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute h-full w-full rounded-none bg-background p-5 ">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default MobileNavCollapsible
