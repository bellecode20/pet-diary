import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
import { getIdBySession } from "../../../lib/getIdBySession";
const handler = async (req, res) => {
  const client = await connectToDatabase();
  const { postId, photoUrl, photoPublicId, title, content, timestamp } =
    req.body;

  const idOfSession = await getIdBySession({ req });
  const communityCollection = client.db().collection("community");
  const existingPost = await communityCollection.findOne({
    commuPostId: postId,
  });
  console.log(idOfSession);
  console.log(req.body);
  //만약 지금 업로드중인 글이라면 새로운 문서를 만드는 대신 photourl을 추가한다.
  if (existingPost) {
    const result = await communityCollection.updateOne(
      { commuPostId: postId },
      { $push: { photo: photoUrl, photoPublicId: photoPublicId } }
    );
    res.status(201).json({ message: "Saved to MongoDB!" });
    client.close();
    return;
  }
  const result = await communityCollection.insertOne({
    commuPostId: postId,
    userId: idOfSession,
    photo: [photoUrl],
    photoPublicId: [photoPublicId],
    title: title,
    content: content,
    timestamp: timestamp,
    likeIds: [],
    commentIds: [],
  });
  console.log("맨아래");
  res.status(201).json({ message: "Saved to MongoDB!" });
  client.close();
  return;
};
export default handler;
