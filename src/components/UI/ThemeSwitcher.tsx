'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '../shadCn/ui/button'

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Button
            className="bg-zinc-100 px-2 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <svg
                width={28}
                height={28}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M320 85.333333c-76.373333 49.066667-128 135.68-128 234.666667s51.626667 185.6 129.28 234.666667C190.293333 554.666667 85.333333 449.706667 85.333333 320A234.666667 234.666667 0 0 1 320 85.333333m493.653333 64l61.013334 61.013334L210.346667 874.666667 149.333333 813.653333 813.653333 149.333333m-263.68 103.68L486.826667 213.333333 425.386667 256l17.92-72.533333L384 138.24l74.666667-5.12 24.746666-70.4L512 132.266667l73.813333 1.28-57.6 48.213333 21.76 71.253333m-140.8 154.026667l-49.493333-31.146667-47.786667 33.28 14.506667-56.32-46.506667-35.413333 58.026667-3.84 19.2-55.04 21.76 54.186667 58.026667 1.28-44.8 37.12 17.066666 55.893333M810.666667 576a234.666667 234.666667 0 0 1-234.666667 234.666667c-52.053333 0-100.266667-17.066667-139.093333-45.653334l328.106666-328.106666c28.586667 38.826667 45.653333 87.04 45.653334 139.093333m-187.733334 280.746667l118.186667-49.066667-10.24 142.933333-107.946667-93.866666m184.746667-115.2l49.066667-118.186667 93.866666 108.373333-142.933333 9.813334m49.066667-211.626667l-48.64-118.613333 142.506666 10.24-93.866666 108.373333M410.88 807.68l118.186667 49.066667-107.946667 93.44-10.24-142.506667z"
                    fill={theme === 'dark' ? 'white' : 'black'}
                />
            </svg>
        </Button>
    )
}
