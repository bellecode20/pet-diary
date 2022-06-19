import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
const handler = async (req, res) => {
  const client = await connectToDatabase();
  const { postId, photoUrl, postingDate, title, content, photoPublicId } =
    req.body;
  const session = await getSession({ req });
  const idOfSession = session.user.userId;
  const diaryCollection = client.db().collection("privateDiary");
  const existingPost = await diaryCollection.findOne({ postId: postId });
  //만약 지금 업로드중인 글이라면 새로운 문서를 만드는 대신 photourl을 추가한다.
  if (existingPost) {
    const result = await diaryCollection.updateOne(
      { postId: postId },
      { $push: { photo: photoUrl, photoPublicId: photoPublicId } }
    );
    res.status(201).json({ message: "Saved to MongoDB!" });
    client.close();
    return;
  }
  const result = await diaryCollection.insertOne({
    userId: idOfSession,
    photo: [photoUrl],
    photoPublicId: [photoPublicId],
    postId: postId,
    postingDate: postingDate,
    title: title,
    content: content,
  });
  res.status(201).json({ message: "Saved to MongoDB!" });
  client.close();
};
export default handler;
