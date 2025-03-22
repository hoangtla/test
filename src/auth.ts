import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        // Here you would typically validate against your database
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
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
}); 