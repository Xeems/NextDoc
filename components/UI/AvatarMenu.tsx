'use client'

import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../shadCn/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../shadCn/ui/dropdown-menu'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function AvatarMenu() {
    const { theme, setTheme } = useTheme()
    const { data: session } = useSession()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex flex-row items-center gap-x-2">
                    <Avatar className="h-7 w-7 border border-solid">
                        <AvatarImage src={session?.user?.image as string} />
                        <AvatarFallback>RU</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-start align-text-bottom font-normal md:block">
                        {session?.user?.username}
                    </span>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="z-[9999] mt-2 w-fit min-w-52 rounded-md border border-solid bg-white px-1 py-2 dark:bg-black">
                <DropdownMenuLabel className="font-normal">
                    {session?.user?.name}
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="dark:bg-zinc-700" />

                <Link href={'/account'}>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account</span>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator className="dark:bg-zinc-700" />

                <DropdownMenuLabel>Theme</DropdownMenuLabel>

                <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(value) => setTheme(value)}>
                    <DropdownMenuRadioItem value="light">
                        Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                        Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                        System
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

                <DropdownMenuSeparator className="dark:bg-zinc-700" />

                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
