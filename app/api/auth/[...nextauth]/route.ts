import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { redirect } from "next/navigation";
import { open } from "sqlite";
import { Database } from "sqlite3";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    //@ts-ignore
    async signIn({ user }) {
      try {
        const db = await open({
          filename: "./todobase.db",
          driver: Database,
        });
        const userInfo = await db.all(
          "select * from User where email=?",
          user?.email
        );
        if (!userInfo) {
          const createdAt = new Date().toISOString();
          await db.run(
            "insert into User (email,name, profile_url,createdAt) values(?,?,?, ?)",
            user?.email,
            user?.name,
            user?.image,
            createdAt
          );
        }
        return true;
      } catch (e) {
        console.log({ e });
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
