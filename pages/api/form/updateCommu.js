import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";
const handler = async (req, res) => {
  const session = await getSession({ req: req });
  const idOfSession = session.user.userId;
  const client = await connectToDatabase();
  const commuCollection = client.db().collection("community");
  if (req.body.userId === idOfSession) {
    // 텍스트만 수정한 경우이다.
    if (req.body.onlyText) {
      const result = await commuCollection.updateOne(
        {
          commuPostId: req.body.commuPostId,
        },
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            isUpdated: "YES",
          },
        }
      );
      res
        .status(200)
        .json({ message: "Text Value that user requested is updated!" });
      client.close();
      return;
    }
    //사진은 수정한 경우이다. 이 때 첫번째 반복문은 텍스트 내용도 수정한다.
    if (req.body.forLoopIndex === 0) {
      console.log(`req.body.forLoopIndex if`);
      console.log(req.body.forLoopIndex);
      const result = await commuCollection.updateOne(
        {
          commuPostId: req.body.commuPostId,
        },
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            isUpdated: "YES",
          },
          $push: {
            photo: req.body.photo,
            photoPublicId: req.body.photoPublicId,
          },
        }
      );
      res.status(200).json({ message: "update first photo from MongoDB!" });
      client.close();
      return;
    } else {
      console.log(`req.body.forLoopIndex else`);
      console.log(req.body.forLoopIndex);
      //첫번째 반복문이 아니라면 텍스트는 수정하지 않고 사진만 배열에 추가한다.
      const result = await commuCollection.updateOne(
        {
          commuPostId: req.body.commuPostId,
        },
        {
          $push: {
            photo: req.body.photo,
            photoPublicId: req.body.photoPublicId,
          },
        }
      );
      res.status(200).json({ message: "update next photo from MongoDB!" });
      client.close();
      return;
    }
  }

  if (idOfSession) {
    res.status(403).json({ message: "Not allowed to this user" });
    client.close();
    return;
  }

  res.status(401).json({ message: "Not authenticated user" });
  client.close();

  //I. delete For updating API (mongodb에서검색할필드, {삭제할데이터정보})
  //(적용대상: 커뮤, 다이어리)
  //  1. cloudinary에서 사진 삭제
  //  2. mongodb에서 사진정보 수정
  ////
  //  updateDiary에서 필요한 정보: 삭제할 사진의 public id, 지금 수정 중인 글 id

  //II. update info (반복문으로 요청) API
  //  3. cloudinary에 사진 업로드
  //  4. 사진 업로드 정보 받아서 mongodb에서 수정
  //  (문제는 업로드는 반복문으로 여러번 요청해야 한다는 것이다.)
  //   index정보 담아져있는데, index가 0이면 ~~~ index가 0이 아니면 ~~~~
};
export default handler;
