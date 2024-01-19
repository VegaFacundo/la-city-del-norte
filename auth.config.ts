import type { NextAuthConfig } from 'next-auth'
import { UserAuth } from './app/lib/types/definitions'

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isLogInPage = nextUrl.pathname.startsWith('/login')
      if (!isOnDashboard && !isLogInPage) {
        return true
      }
      if (!isLoggedIn) {
        return false
      }
      if (isLogInPage) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
    jwt: async ({ token, user, account }) => {
      if (account) {
        const userData = user as UserAuth
        token.userType = userData.user_type.name
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user && token.userType) {
        ;(session.user as any).userType = token.userType
      }
      return session
    },
  },
} satisfies NextAuthConfig
