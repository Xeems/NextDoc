import { usePathname } from 'next/navigation'

export function useActivePath(): (path: string) => boolean {
    const pathname = usePathname()

    const checkActivePath = (path: string) => {
        if (path.endsWith('/')) path = path.slice(0, -1)
        return path === pathname
    }

    return checkActivePath
}

//to-do expand functionality, add options with partial link matching
