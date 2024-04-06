import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function normilizeName(str: string): string {
    return str.replace(/\s/g, '-')
}

export const wait = (n: number) =>
    new Promise((resolve) => setTimeout(resolve, n))
