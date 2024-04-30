import { prisma } from '@/src/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

            profile(profile) {
                return {
                    id: profile.sub.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    username: profile.given_name,
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

    adapter: PrismaAdapter(prisma as any),
}

export default NextAuth(authOptions)
