'use client'

import React, { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVarinats = "primary" | "secondary" 

type buttonProps = {
    variant?: ButtonVarinats,
    className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function UIButton({ className, variant = 'primary', ...props }: buttonProps) {
    return (
        <button {...props}
            className={cn(
                'w-fit px-4 h-10 flex gap-x-2 items-center justify-center self-center rounded-lg whitespace-nowrap transition-all active:scale-95',
                {
                    primary: 'border-0 bg-primary text-primary-foreground hover:bg-ring',
                    secondary: 'border border-solid border-border bg-background',
                }[variant],
                className)} />
    )
}
