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
        // user already exists just sign in
        return true;
      } else {
        setDoc(userRef, user);
        return true;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };
