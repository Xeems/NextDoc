import Link from 'next/link'
import React from 'react'

type NavLinkType = {
    title: string
    href: string
}

type Props = {
    links: NavLinkType[]
    basePath: string
}

export default function TeamNav({ links, basePath }: Props) {
    return (
        <div className="flex w-full items-center justify-center border-0 border-b border-solid bg-background-accent dark:bg-background">
            <div className="scroll mx-auto flex h-full w-full gap-x-1 overflow-x-auto lg:min-w-[64rem] lg:max-w-[70rem] ">
                {links &&
                    links.map((link) => {
                        return (
                            <NavItem
                                href={`${basePath}/${link.href}`}
                                title={link.title}
                                key={link.title}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

function NavItem(link: NavLinkType) {
    return (
        <Link
            className="min-w-fit rounded-md px-4 py-2 align-text-bottom font-light text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
            href={link.href}>
            {link.title}
        </Link>
    )
}
