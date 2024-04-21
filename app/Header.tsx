'use client'

import AvatarMenu from '@/components/UI/AvatarMenu'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Suspense } from 'react'

function Header() {
    const session = useSession()
    return (
        <header className="sticky top-0 z-50 flex h-[50px] border-0 border-b border-solid bg-background-accent filter backdrop-blur-md">
            <div className="mx-auto flex w-full items-center justify-between bg-transparent lg:min-w-[64rem] lg:max-w-[70rem]">
                <div className="text-3xl font-semibold">Logo</div>

                <div className="my-auto flex h-full flex-row items-center gap-5">
                    <Suspense fallback={'Loading....'}>
                        <div className="flex flex-row items-center gap-x-2">
                            <Link
                                className="px-1 text-sm font-normal text-muted-foreground transition-all hover:text-secondary-foreground"
                                href={`/search`}>
                                Search
                            </Link>
                            {session.data ? (
                                <>
                                    <Link
                                        className="px-1 text-sm font-normal mr-6 text-muted-foreground transition-all hover:text-secondary-foreground"
                                        href={`/users/${session.data?.user.username}`}>
                                        Account
                                    </Link>

                                    <AvatarMenu />
                                </>
                            ) : (
                                <Link href={'/auth'}>LogIn</Link>
                            )}
                        </div>
                    </Suspense>
                </div>
            </div>
        </header>
    )
}

export default Header
