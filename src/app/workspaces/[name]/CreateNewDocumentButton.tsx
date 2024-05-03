'use client'

import React from 'react'
import Link from 'next/link'

import { Button } from '@/src/components/shadCn/ui/button'

export const CreateNewDocumentButton = () => {
    return (
        <Link href="/new">
            <Button>Create document</Button>
        </Link>
    )
}
