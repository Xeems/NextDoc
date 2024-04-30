'use client'

import Link from "next/link"

type Props = {
  links?: string[]
}

export default function PageContent({ links }: Props) {
  return (
    <div className="">
      <div className="w-auto h-screen  mx-8 flex flex-col justify-start">
        <p className="text-base font-semibold">On this page</p>
        <nav>
          <ul>
            {links?.map((link: string) => {
              return <li className="my-3 font-light text-gray-300"><Link href={`#${link}`}>{link}</Link></li>
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
