import './globals.scss'
import type { Metadata } from 'next'
import Header from '@/app/Header'
import { ThemeProvider } from '@/components/Providers/ThemeProvider'
import UserSessionProvider from '@/components/Providers/SessionProvider'
import { Toaster } from 'sonner'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import QueryProvider from '@/components/Providers/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
    title: 'NextDocs',
    description: 'Generated by create next app',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <UserSessionProvider>
                <QueryProvider>
                    <body className="bg-background">
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange>
                            <Toaster
                                position="top-center"
                                richColors
                                visibleToasts={5}
                            />
                            <Header />
                            <main className="flex h-[calc(100vh-60px)] w-full justify-center">
                                {children}
                            </main>

                            <ReactQueryDevtools initialIsOpen={false} />
                            <SpeedInsights />
                        </ThemeProvider>
                    </body>
                </QueryProvider>
            </UserSessionProvider>
        </html>
    )
}
