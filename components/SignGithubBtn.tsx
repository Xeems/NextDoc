'use client'

import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { GithubIcon } from 'lucide-react'
import { Button } from './shadCn/ui/button'

export default function SignGithubBtn() {
    const { data: session } = useSession()

    return (
        <Button
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
