import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
const cloudinary = require("../../../lib/cloudinary");

const handler = async (req, res) => {
  const client = await connectToDatabase();
  const session = await getSession({ req: req });
  const diaryCollection = client.db().collection("privateDiary");
  const idOfSession = session.user.userId;
  const userId = req.body.userId;
  const postId = req.body.postId;
  const photoPublicId = req.body.photoPublicId;

  //cloudinary.api.delete_resources에는 public_id를 배열로 넣어야 하는데,
  //req.body에서 받아온 public_id는 JSON객체이기 때문에 새 배열을 만든다.
  let photoPublicIdArr = [];
  for (let i = 0; i < photoPublicId.length; i++) {
    photoPublicIdArr.push(photoPublicId[i]);
  }

  //지금 로그인한 유저의 아이디와, 삭제요청을 보냈을 때의 유저아이디가 같은 경우에 삭제한다.
  if (userId === idOfSession) {
    const result = await diaryCollection.deleteOne({
      userId: userId,
      postId: postId,
    });
    const cloudResult = await cloudinary.api.delete_resources(
      photoPublicIdArr,
      { resource_type: "image" },
      (result, error) => {
        console.log(result, error);
      }
    );
    res.status(200).json({ message: "Delete the diary post from MongoDB!" });
    client.close();
    return;
  }

  if (idOfSession) {
    res.status(403).json({ message: "Not allowed to this user" });
    client.close();
    return;
  }

  res.status(401).json({ message: "Not authenticated user" });
  client.close();
};
export default handler;
