import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

export const options: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        if (email === "test@example.com" && password === "password") {
          return {
            id: "1",
            email: "test@example.com",
            name: "Test User",
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.AUTH_SECRET,
}

export const { auth } = NextAuth(options); 