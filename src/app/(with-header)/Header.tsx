'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import AvatarMenu from '@/src/components/UI/AvatarMenu'

import { ROUTES } from '../../lib/routes'

function Header() {
    const session = useSession()
    return (
        <header className="sticky top-0 z-10 flex h-[50px] border-0 border-b border-solid bg-background-accent p-0 filter backdrop-blur-md">
            <div className=" mx-5 flex w-full items-center justify-between bg-transparent lg:mx-20 ">
                <div className="text-3xl font-semibold">
                    <Link href={ROUTES.HOME}>NextDoc</Link>
                </div>

                <div className="my-auto flex h-full flex-row items-center gap-5">
                    <div className="flex flex-row items-center gap-x-2">
                        <Link
                            className="px-1 text-sm font-normal text-muted-foreground transition-all hover:text-secondary-foreground"
                            href={ROUTES.SEARCH}>
                            Search
                        </Link>
                        {session.data ? (
                            <>
                                <Link
                                    className=" px-1 text-sm font-normal text-muted-foreground transition-all hover:text-secondary-foreground"
                                    href={ROUTES.NEW}>
                                    New Document
                                </Link>

                                <Link
                                    className="mr-6 px-1 text-sm font-normal text-muted-foreground transition-all hover:text-secondary-foreground"
                                    href={ROUTES.USER(
                                        session.data.user.username,
                                    )}>
                                    Account
                                </Link>

                                <AvatarMenu />
                            </>
                        ) : (
                            <Link href={ROUTES.AUTH}>LogIn</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
