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
          username: profile.data.username,
          id: profile.data.id,
          name: profile.data.name,
          image: profile.data.profile_image_url,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const userRef = doc(db, "users", user.id);
      const docUser = await getDoc(userRef);
      if (docUser.exists()) {
        return true;
      } else {
        // Create a clean user object with only the data we want to store
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email || null,
          image: user.image,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };

        await setDoc(userRef, userData);
        return true;
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
