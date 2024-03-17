'use client'

import UINavigationLink from '@/components/UI/UINavigationLink'
import { useSession } from 'next-auth/react'
import AvatarMenu from '@/components/AvatarMenu'
import Link from 'next/link'

function Header() {
    const session = useSession()
    return (
        <header className="sticky top-0 z-50 flex h-[60px] border-0 border-b border-solid bg-background-accent filter backdrop-blur-md">
            <div className="mx-auto flex w-full items-center justify-between bg-transparent lg:min-w-[64rem] lg:max-w-[70rem]">
                <div className="text-3xl font-semibold">Logo</div>

                <div className="my-auto flex h-full flex-row items-center gap-5">
                    {session.data ? (
                        <>
                            <div className="flex gap-x-2">
                                <Link
                                    className="px-1 text-end font-normal text-muted-foreground transition-all hover:text-secondary-foreground"
                                    href={`/users/${session.data?.user.username}`}>
                                    Dashboard
                                </Link>
                                <Link
                                    className="px-1 text-end font-normal text-muted-foreground transition-all hover:text-secondary-foreground"
                                    href={`/teams`}>
                                    Teams
                                </Link>
                            </div>
                            <AvatarMenu />
                        </>
                    ) : (
                        <UINavigationLink link="/auth" name="LogIn" />
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
