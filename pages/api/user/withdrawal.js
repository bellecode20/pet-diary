import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
const cloudinary = require("../../../lib/cloudinary");
const handler = async (req, res) => {
  //1. 요청이 "PATCH"인지 확인한다.
  if (req.method !== "PATCH") {
    throw new Error("Request method is not appropriate.");
  }
  //2. 인증된 유저인지 확인한다.
  const session = await getSession({ req: req });
  if (!session) {
    res
      .status(401)
      .json({ message: "Not authenticated!", contentStatus: "005" });
    return;
  }
  //아이디 찾는다.
  const userId = session.user.userId;
  const oldPw = req.body.oldPw;
  const client = await connectToDatabase();
  const userCollection = client.db().collection("users");
  const user = await userCollection.findOne({ userId: userId });
  if (!user) {
    res.status(404).json({ message: "User not found.", contentStatus: "006" });
    client.close();
    return;
  }
  const currentPwInDb = user.userPw;
  const pwsAreEqual = await verifyPassword(oldPw, currentPwInDb);
  if (!pwsAreEqual) {
    res
      .status(403)
      .json({ message: "Invalid password.", contentStatus: "007" });
    client.close();
    return;
  }
  //업로드했던 사진이 있는 경우에, Cloudinary에서 사진 지운다.
  const diaryCollection = client.db().collection("privateDiary");
  const allOfPhotos = await diaryCollection.distinct("photoPublicId", {
    userId: userId,
  });
  if (allOfPhotos.length > 0) {
    const cloudResult = await cloudinary.api.delete_resources(
      allOfPhotos,
      { resource_type: "image" },
      (result, error) => {
        console.log(result);
        console.log(error);
      }
    );
  }
  //mongodb에서 정보 지운다.
  const userResult = await userCollection
    .deleteOne({
      userId: userId,
    })
    .catch((e) => console.error(e));
  const diaryResult = await diaryCollection
    .deleteMany({
      userId: userId,
    })
    .catch((e) => console.error(e));
  client.close();
  res.status(200).json({
    message: "Delete data of The User!",
    contentStatus: "008",
  });
};
export default handler;
