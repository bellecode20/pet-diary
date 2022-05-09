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
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }
  const result = await usersCollection.insertOne({
    userId: userId,
    userPw: hashedPassword,
  });
  //console.log(result);
  res.status(201).json({ message: "Created user!" });
  client.close();
}
export default handler;
