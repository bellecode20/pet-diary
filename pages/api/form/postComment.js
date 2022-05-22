import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
import { getIdBySession } from "../../../lib/getIdBySession";
const handler = async (req, res) => {
  const client = await connectToDatabase();
  const { commentPostId, commuPostId, content, timestamp } = req.body;

  const idOfSession = await getIdBySession({ req });
  const commentsCollection = client.db().collection("comments");
  const commuCollection = client.db().collection("community");
  const toCommuPost = await commuCollection.updateOne(
    { commuPostId: commuPostId },
    { $push: { commentIds: commentPostId } }
  );
  console.log(idOfSession);

  const result = await commentsCollection.insertOne({
    commentPostId: commentPostId,
    commuPostId: commuPostId,
    userId: idOfSession,
    content: content,
    timestamp: timestamp,
  });
  res.status(201).json({ message: "Saved to MongoDB!" });
  client.close();
};
export default handler;
