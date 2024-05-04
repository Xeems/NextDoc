'use client'

import { Button } from '@/src/components/shadCn/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/src/components/shadCn/ui/drawer'
import useMediaQuery from '@/src/hooks/useMediaQuery'
import { ChevronRightIcon } from 'lucide-react'
import React from 'react'

export const NavMobileDrawer = ({
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
        <Drawer open={open} onOpenChange={setOpen} direction="left">
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-x-4 px-2">
                    <ChevronRightIcon className="size-4" /> Document content
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-5">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Document content</DrawerTitle>
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    )
}

export default NavMobileDrawer
