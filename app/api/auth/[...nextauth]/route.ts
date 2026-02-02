import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/api/models/userModal";
import { connect } from "@/app/api/DbConn/dbConn";

connect();

/* 🔥 EXPORT authOptions */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({
          email: credentials.email,
          password: credentials.password, // ⚠️ bcrypt later
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      if (trigger === "update") {
        if (session?.name) token.name = session.name;
        if (session?.image) token.image = session.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};

/* 🔥 Handler stays SAME */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
