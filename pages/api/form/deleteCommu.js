import { connectToDatabase } from "../../../lib/db";
import { getIdBySession } from "../../../lib/getIdBySession";
const cloudinary = require("../../../lib/cloudinary");

const deleteCommu = async (req, res) => {
  const client = await connectToDatabase();
  const commentCollection = client.db().collection("comments");
  const commuCollection = client.db().collection("community");
  const idOfSession = await getIdBySession({ req });
  //요청으로 받은 댓글ID로 댓글 작성자 아이디를 찾고,
  //지금 로그인한 유저의 아이디가 일치하면 삭제한다.
  const thisCommu = await commuCollection.findOne({
    commuPostId: req.body.commuPostId,
  });

  if (thisCommu.userId === idOfSession) {
    const result = await commuCollection.deleteOne({
      commuPostId: req.body.commuPostId,
    });
    const commentResult = await commentCollection.deleteMany({
      commuPostId: req.body.commuPostId,
    });
    const cloudResult = await cloudinary.api.delete_resources(
      thisCommu.photoPublicId,
      { resource_type: "image" },
      (result, error) => {
        return console.log(result, error);
      }
    );
  }

  res.status(200).json({ message: "delete the community post from MongoDB!" });
  client.close();
};
export default deleteCommu;
