import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
const handler = async (req, res) => {
  //1. 요청이 "PATCH"인지
  if (req.method !== "PATCH") {
    return;
  }
  //2. 인증된 유저인지.
  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  //아이디 찾기
  const userId = session.user.userId;
  const oldPw = req.body.oldPw;
  const newPw = req.body.newPw;
  const client = await connectToDatabase();
  const userCollection = client.db().collection("users");
  const user = await userCollection.findOne({ userId: userId });
  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }
  const currentPwInDb = user.userPw;
  const pwsAreEqual = await verifyPassword(oldPw, currentPwInDb);
  if (!pwsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(newPw);
  const result = await userCollection.updateOne(
    { userId: userId },
    { $set: { userPw: hashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Pw updated!" });
};
export default handler;
