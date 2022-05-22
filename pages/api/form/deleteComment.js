// import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { getIdBySession } from "../../../lib/getIdBySession";

const deleteComment = async (req, res) => {
  const client = await connectToDatabase();
  const commentCollection = client.db().collection("comments");
  const commuCollection = client.db().collection("community");
  const idOfSession = await getIdBySession({ req });
  //요청으로 받은 댓글ID로 댓글 작성자 아이디를 찾고,
  //지금 로그인한 유저의 아이디가 일치하면 삭제한다.
  const thisComment = await commentCollection.findOne({
    commentPostId: req.body.commentPostId,
  });

  if (thisComment.userId === idOfSession) {
    const result = await commentCollection.deleteOne({
      commentPostId: req.body.commentPostId,
    });
    const commuResult = await commuCollection.findOneAndUpdate(
      { commuPostId: req.body.commuPostId },
      { $pull: { commentIds: req.body.commentPostId } }
    );
  }

  res.status(200).json({ message: "delete the comment from MongoDB!" });
  client.close();
};
export default deleteComment;
