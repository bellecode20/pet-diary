import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
const handler = async (req, res) => {
  const session = await getSession({ req: req });
  const idOfSession = session.user.userId;
  const client = await connectToDatabase();
  const diaryCollection = client.db().collection("privateDiary");
  const userId = req.body.userId;
  const postId = req.body.postId;
  //지금 로그인한 유저의 아이디와, 삭제요청을 보냈을 때의 유저아이디가 같은 경우에 삭제한다.
  if (userId === idOfSession) {
    const result = await diaryCollection.deleteOne({
      userId: userId,
      postId: postId,
    });
    res.status(200).json({ message: "Delete to MongoDB!" });
    client.close();
    return;
  }

  if (idOfSession) {
    const result = await diaryCollection.updateOne(
      { postId: postId },
      { $push: { photo: photoUrl } }
    );
    res.status(403).json({ message: "Not allowed to this user" });
    client.close();
    return;
  }

  res.status(401).json({ message: "Not authenticated user" });
  client.close();
};
export default handler;
