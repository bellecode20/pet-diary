import { hashPassword } from "../../../lib/auth";
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { userId, userPw } = data; // 요청에서 담은 유저 정보를 destructure한다.
  if (
    !userId ||
    !userPw ||
    userId.trim().length < 7 ||
    userPw.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - id and pw should also be at least 7 characters long.",
      status: 422,
      contentStatus: "001",
    });
    return;
  }
  let onlyEngAndNum = /^[A-Za-z0-9]*$/;
  if (!onlyEngAndNum.test(userId) || !onlyEngAndNum.test(userPw)) {
    res.status(422).json({
      message: "no",
      status: 422,
      contentStatus: "002",
    });
    return;
  }
  const client = await MongoClient.connect(
    "mongodb+srv://admin:miny9501@cluster0.roklt.mongodb.net/diary?retryWrites=true&w=majority"
  );
  const db = client.db();
  const usersCollection = db.collection("users");
  const existingUser = await usersCollection.findOne({ userId: userId });
  const hashedPassword = await hashPassword(userPw); //비밀번호를 해쉬화한다.
  if (existingUser) {
    res.status(422).json({
      message: "User exists already!",
      status: 422,
      contentStatus: "003",
    });
    client.close();
    return;
  }
  const result = await usersCollection.insertOne({
    userId: userId,
    userPw: hashedPassword,
  });
  res.status(201).json({ message: "Created user!", status: 201 });
  client.close();
}
export default handler;
