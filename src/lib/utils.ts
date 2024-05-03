import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function normalizeName(str: string): string {
    return str.trim().replace(/\s/g, '-')
}

export const wait = (n: number) =>
    new Promise((resolve) => setTimeout(resolve, n))
