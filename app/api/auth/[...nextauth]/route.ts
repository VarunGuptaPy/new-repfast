import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      version: "2.0",

      profile: (profile) => {
        console.log(profile.data.email);
        return {
          followers: profile.data.public_metrics?.followers_count,
          following: profile.data.public_metrics?.following_count,
          id: profile.data.id,
          name: profile.data.name,
          image: profile.data.profile_image_url,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };
