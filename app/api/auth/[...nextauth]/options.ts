import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import { prisma } from '@/lib/prisma'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    username: profile.login,
                }
            },
        }),
    ],
    callbacks: {
        session: async ({ session, user, token }) => {
            if (session?.user) {
                session.user.id = user.id
                session.user.username = user.username
                session.user = user
            }
            return session
        },
    },

    session: {
        strategy: 'database',
    },

    pages: {
        signIn: '/auth',
        signOut: '/auth',
    },
    adapter: PrismaAdapter(prisma as any),
}

export default NextAuth(authOptions)
