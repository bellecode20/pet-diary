import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
export default NextAuth({
  providers: [
    CredentialsProvider({
      sessions: {
        jwt: true,
      },
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({ id: credentials.id }); //유저가 입력한 아이디와 일치하는 아이디가 있는지 찾는다.
        const isValid = await verifyPassword(credentials.pw, user.pw);
        if (!user) {
          client.close();
          throw new Error("No user found!");
        } else if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }
        client.close(); //리턴 하기 전 client는 종료한다.
        console.log(user.id);
        return { id: user.id }; //리턴 값은 JSON 웹토큰으로 인코딩된다.
      },
    }),
  ],
  secret: process.env.SECRET,
});
// import NextAuth from "next-auth/next";
// import Providers from "next-auth/providers";
// import { verifyPassword } from "../../../lib/auth";
// import { connectToDatabase } from "../../../lib/db";
// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       sessions: {
//         jwt: true,
//       },
//       async authorize(credentials) {
//         const client = await connectToDatabase();
//         const usersCollection = client.db().collection("users");
//         const user = await usersCollection.findOne({ id: credentials.id }); //유저가 입력한 아이디와 일치하는 아이디가 있는지 찾는다.
//         if (!user) {
//           client.close();
//           throw new Error("No user found!");
//         }
//         const isValid = await verifyPassword(credentials.pw, user.pw);
//         if (!isValid) {
//           client.close();
//           throw new Error("Could not log you in!");
//         }
//         client.close(); //리턴 하기 전 client는 종료한다.
//         return { id: user.id }; //리턴 값은 JSON 웹토큰으로 인코딩된다.
//       },
//     }),
//   ],
// });
