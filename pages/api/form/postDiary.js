import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
const handler = async (req, res) => {
  const client = await connectToDatabase();
  const photoUrl = req.body;
  const session = await getSession({ req });
  const idOfSession = session.user.userId;
  const diaryCollection = client.db().collection("privateDiary");
  const result = await diaryCollection.insertOne({
    userId: idOfSession,
    photo: photoUrl,
  });
  res.status(201).json({ message: "Saved to MongoDB!" });
  client.close();
};
export default handler;
