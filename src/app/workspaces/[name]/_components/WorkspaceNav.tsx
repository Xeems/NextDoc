import { WorkspaceNavLink } from './WorkspaceNavLink'

const links = [
    {
        href: '',
        title: 'Documents',
    },
    {
        href: 'users',
        title: 'Users',
    },
    {
        href: 'settings',
        title: 'Settings',
    },
]

type Props = {
    basePath: string
}

export default function WorkspaceNav({ basePath }: Props) {
    return (
        <nav className=" -mt-[1px] flex w-full items-center justify-center border-0 border-b  bg-background-accent">
            <div className="mx-5 flex h-full w-full gap-x-1 overflow-x-auto lg:mx-20">
                {links.map((link) => {
                    return (
                        <WorkspaceNavLink
                            href={`${basePath}/${link.href}`}
                            title={link.title}
                            key={link.href}
                        />
                    )
                })}
            </div>
        </nav>
    )
}
