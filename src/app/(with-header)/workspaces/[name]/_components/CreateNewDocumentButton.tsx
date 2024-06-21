'use client'

import React, { useContext } from 'react'
import Link from 'next/link'

import { Button } from '@/src/components/shadCn/ui/button'

import { WorkspaceContext } from './WorkspaceContext'

export const CreateNewDocumentButton = () => {
    const { userRole } = useContext(WorkspaceContext)

    if (userRole === 'OWNER' || userRole === 'ADMIN')
        return (
            <Link href="/new">
                <Button>Create document</Button>
            </Link>
        )
    else return <></>
}
