'use client'

import Link from 'next/link'

type Props = {
    link: string
    name: string
}

function UINavigationLink(props: Props) {
    return (
        <div className="flex h-fit w-fit content-center justify-center px-2 align-middle text-xl font-normal">
            <Link href={props.link}>{props.name}</Link>
        </div>
    )
}

export default UINavigationLink
