import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
const cloudinary = require("../../../lib/cloudinary");
const deleteForUpdate = async (req, res) => {
  const client = await connectToDatabase();
  const session = await getSession({ req: req });
  const idOfSession = session.user.userId;
  const { userId, postId, collectionName } = req.body;
  const requestedCollection = client.db().collection(collectionName);
  let fieldName;
  if (collectionName === "privateDiary") {
    fieldName = "postId";
  } else if (collectionName === "community") {
    fieldName = "commuPostId";
  }
  if (userId === idOfSession) {
    //1. cloudinary에서 삭제하기 위해서는 먼저 publicid를 알아야 한다.
    const oldPost = await requestedCollection.findOne({
      [fieldName]: postId,
    });
    //2. publicId를 보내서 삭제한다.
    console.log(`oldPost`);
    console.log(oldPost);
    const cloudResult = await cloudinary.api.delete_resources(
      oldPost.photoPublicId,
      { resource_type: "image" },
      (result, error) => {
        console.log(result, error);
      }
    );
    //3. mongodb의 기존 publicId관련 필드들을 []로 리셋한다.
    const mongoResult = await requestedCollection.updateOne(
      {
        [fieldName]: postId,
      },
      { $set: { photoPublicId: [], photo: [] } }
    );
    res.status(200).json({ message: "Delete to MongoDB!" });
    client.close();
    return;
  } else {
    res.status(401).json({ message: "Not authenticated user" });
    client.close();
    return;
  }
  res.status(404).json({ message: "Not Found" });
  client.close();
  return;
};
export default deleteForUpdate;
