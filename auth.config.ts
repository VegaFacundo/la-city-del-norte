import type { NextAuthConfig } from 'next-auth'

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
  },
} satisfies NextAuthConfig
