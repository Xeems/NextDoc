import React from 'react'

import Header from './Header'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main className="flex h-[calc(100vh-50px)] w-full justify-center">
                {children}
            </main>
        </div>
    )
}

export default layout
