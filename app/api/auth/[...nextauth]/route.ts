import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      version: "2.0",

      profile: (profile) => {
        return {
          id: profile.data.id,
          name: profile.data.name,
          email: null,
          image: profile.data.profile_image_url,
          username: profile.data.username,
        };   
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = (user as any).username;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      try {
        const userRef = doc(db, "users", user.id);
        const docUser = await getDoc(userRef);

        if (!docUser.exists()) {
          const userData = {
            id: user.id,
            name: user.name,
            image: user.image,
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            username: (user as any).username,
            learned: false,
            status: "not learned",
          };
          await setDoc(userRef, userData);
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  cookies: {
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
