'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

type Props = {
    children: ReactNode
}

const UserSessionProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default UserSessionProvider
