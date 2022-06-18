import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
async function handler(req, res) {
  const { userId, userPw } = req.body;
  if (req.method !== "POST") return;
  if (
    !userId ||
    !userPw ||
    userId.trim().length < 7 ||
    userPw.trim().length < 7
  ) {
    res.status(400).json({
      message:
        "Invalid input - id and pw should also be at least 7 characters long.",
      contentStatus: "001",
    });
    return;
  }
  let onlyEngAndNum = /^[A-Za-z0-9]*$/;
  if (!onlyEngAndNum.test(userId) || !onlyEngAndNum.test(userPw)) {
    res.status(400).json({
      message: "no",
      contentStatus: "002",
    });
    return;
  }
  const client = await connectToDatabase();
  const db = await client.db();
  const usersCollection = await db.collection("users");
  const existingUser = await usersCollection.findOne({ userId: userId });
  const hashedPassword = await hashPassword(userPw); //비밀번호를 해쉬화한다.
  if (existingUser) {
    res.status(400).json({
      message: "User exists already!",
      contentStatus: "003",
    });
    client.close();
    return;
  }
  const result = await usersCollection.insertOne({
    userId: userId,
    userPw: hashedPassword,
  });
  res
    .status(201)
    .json({ message: "Created user!", status: 201, contentStatus: "004" });
  client.close();
}
export default handler;
