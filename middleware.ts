export { default } from 'next-auth/middleware'

export const config = { matcher: ['new'] }

secret: process.env.NEXTAUTH_SECRET
