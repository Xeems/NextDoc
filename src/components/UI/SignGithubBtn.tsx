'use client'

import { GithubIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'

import { Button } from '../shadCn/ui/button'

type Props = {
    children?: React.ReactNode
}
export default function SignGithubBtn({ children }: Props) {
    const { data: session } = useSession()

    return (
        <Button
            className="bg-black text-white  hover:bg-zinc-800"
            size={'lg'}
            onClick={() => {
                signIn('github', {
                    redirect: false,
                })
            }}>
            <GithubIcon className="h-7 w-7" />
            Sign in with Github
        </Button>
    )
}
