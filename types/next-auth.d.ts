import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string
    error?: string
    user: {
      /** The user's id. */
      id: string
      /** The user's Twitter username. */
      username: string
    } & DefaultSession["user"]
  }

  interface User {
    username?: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's Twitter username. */
    username?: string
    /** The user's Twitter access token. */
    accessToken?: string
    /** The user's Twitter refresh token. */
    refreshToken?: string
    /** Error message if token acquisition fails. */
    error?: string
  }
}