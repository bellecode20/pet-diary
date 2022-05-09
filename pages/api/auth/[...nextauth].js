import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
export default NextAuth({
  providers: [
    CredentialsProvider({
      sessions: {
        strategy: "jwt",
      },
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          userId: credentials.userId,
        }); //유저가 입력한 아이디와 일치하는 아이디가 있는지 찾는다.
        const isValid = await verifyPassword(credentials.userPw, user.userPw);
        if (!user) {
          client.close();
          throw new Error("No user found!");
        } else if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }
        console.log(`[...nextauth]`);
        console.log(`user.userId`);
        console.log(user.userId);
        console.log(`credentials`);
        console.log(credentials);
        client.close(); //리턴 하기 전 client는 종료한다.
        return { userId: user.userId }; //리턴 값은 JSON 웹토큰으로 인코딩된다.
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user;
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.SECRET,
});
