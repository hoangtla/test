import { withAuth } from "next-auth/middleware"

export const runtime = 'nodejs'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware() {
    return
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
)

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/dashboard/:path*"],
} 