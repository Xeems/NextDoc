'use client'

import { User2Icon } from 'lucide-react'
import { signIn } from 'next-auth/react'

import { Button } from '../shadCn/ui/button'

export default function SignGoogleBtn() {
    return (
        <Button
            className="bg-white border-border border text-black flex flex-row justify-items-stretch"
            size={'lg'}
            onClick={() => {
                signIn('google', {
                    redirect: false,
                })
            }}>
            <User2Icon className="h-7 w-7" />
            Sign in with Google
        </Button>
    )
}
