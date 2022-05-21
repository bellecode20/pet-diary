import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
import { getIdBySession } from "../../../lib/getIdBySession";
const handler = async (req, res) => {
  const client = await connectToDatabase();
  const { postId, photoUrl, photoPublicId, title, content, timestamp } =
    req.body;

  const idOfSession = await getIdBySession({ req });
  const communityCollection = client.db().collection("community");
  const existingPost = await communityCollection.findOne({ postId: postId });
  console.log(idOfSession);

  //만약 지금 업로드중인 글이라면 새로운 문서를 만드는 대신 photourl을 추가한다.
  if (existingPost) {
    const result = await communityCollection.updateOne(
      { postId: postId },
      { $push: { photo: photoUrl, photoPublicId: photoPublicId } }
    );
    res.status(201).json({ message: "Saved to MongoDB!" });
    client.close();
    return;
  }
  const result = await communityCollection.insertOne({
    postId: postId,
    userId: idOfSession,
    photo: [photoUrl],
    photoPublicId: [photoPublicId],
    title: title,
    content: content,
    timestamp: timestamp,
    likeIds: [],
    commentIds: [],
  });
  res.status(201).json({ message: "Saved to MongoDB!" });
  client.close();
};
export default handler;
