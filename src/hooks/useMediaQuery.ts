import { useState, useEffect } from 'react'

// Хук для отслеживания состояния медиа-запроса
export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)

        const updateMatches = () => {
            setMatches(mediaQuery.matches)
        }

        updateMatches()

        mediaQuery.addEventListener('change', updateMatches)

        return () => {
            mediaQuery.removeEventListener('change', updateMatches)
        }
    }, [query])

    return matches
}

export default useMediaQuery
