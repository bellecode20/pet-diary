import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../lib/db";
import { useRef, useState } from "react";
import { makeId } from "../../components/makeId";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
import { makeTimestamp } from "../../components/makeTimestamp";
import ModalContainer from "../../components/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, modalIsShown } from "../../store/features/modalSlice";
import DetailDiaryNav from "../components/detailDiaryNav";
import CarouselSlide from "../components/carouselSlide";
import communityHome from "../../styles/pages/communityHome.module.scss";
import Image from "next/image";
const CommuIndex = ({ textedCommunity, textedComments }) => {
  const modal = useSelector((state) => state.modal.isShown);
  const dispatch = useDispatch();
  const commuPost = JSON.parse(textedCommunity);
  const comments = JSON.parse(textedComments);
  const { data: session } = useSession();
  const thisUserId = session.user.userId;
  const router = useRouter();
  const { postId } = router.query;
  const comment = useRef();
  const [updatedComments, setUpdatedComments] = useState(comments); // mongoDB에 저장되어있던 기존 댓글들을 기본값으로 설정한다.
  const deleteComment = async (e) => {
    let deleteInfo = {
      commuPostId: commuPost.commuPostId,
      commentPostId: e.currentTarget.getAttribute("data-remove"),
    };
    // 유저에게 보여지는 댓글 state를 먼저 업데이트하고, post요청을 보낸다.
    setUpdatedComments(
      updatedComments.filter(
        (el) => el.commentPostId != deleteInfo.commentPostId
      )
    );
    const deleteResult = await requestPostToMongodb(
      "/api/form/deleteComment",
      deleteInfo
    );
  };
  const deleteCommu = async (e) => {
    dispatch(changeCategory("LoadingModal"));
    let deleteInfo = {
      commuPostId: commuPost.commuPostId,
    };
    const deleteResult = await requestPostToMongodb(
      "/api/form/deleteCommu",
      deleteInfo
    );
    dispatch(changeCategory("SuccessModal"));
  };
  const submitComments = async (e) => {
    e.preventDefault();
    const enteredComment = comment.current.value;
    const commentPostId = makeId();
    let commentInfo = {
      commentPostId: commentPostId,
      commuPostId: postId,
      content: enteredComment,
      timestamp: makeTimestamp(),
    };
    // 유저에게 보여지는 댓글 state를 먼저 업데이트하고, post요청을 보낸다.
    setUpdatedComments([...updatedComments, commentInfo]);
    comment.current.value = "";
    const postResult = await requestPostToMongodb(
      "/api/form/postComment",
      commentInfo
    );
  };
  return (
    // <div className={communityHome.wrapper}>
    <div
      className={
        modal ? communityHome.wrapper + " noScroll" : communityHome.wrapper
      }
    >
      <DetailDiaryNav userId={commuPost.userId}></DetailDiaryNav>
      <div className={communityHome.mainContainer}>
        <div className={communityHome.mainContent}>
          <div className={communityHome.title}>{commuPost.title}</div>
          <CarouselSlide data={commuPost.photo}></CarouselSlide>
          <p className={communityHome.content}>
            <span className={communityHome.name}>{commuPost.userId}</span>
            {commuPost.content}
            <span className={communityHome.isUpdated}>
              {commuPost.isUpdated && "(수정됨)"}
            </span>
          </p>
          <div className={communityHome.social}>
            <div className={communityHome.commentLogoContainer}>
              <div className={communityHome.comment}>
                <Image
                  src="/comment.png"
                  alt="풍선모양의 댓글 로고"
                  layout="fill"
                ></Image>
              </div>
              <p>{commuPost.commentIds.length > 0 && updatedComments.length}</p>
            </div>
            <form
              className={communityHome.commentForm}
              onSubmit={submitComments}
            >
              <input
                type="text"
                className={communityHome.commentInput}
                ref={comment}
                placeholder="댓글 달기..."
              ></input>
              <button className={communityHome.commentBtn}>게시</button>
            </form>
          </div>
          {updatedComments.map((el, i) => (
            <div className={communityHome.commentContainer} key={i}>
              <div className={communityHome.commentTop}>
                <p className={communityHome.userId}>
                  {/* el.userId가 존재하는 경우 === mongoDB에서 불러온 댓글일 때 */}
                  {/* el.userId가 존재하지 않는 경우 === updatedComments에서 가져온 댓글일 때 */}
                  {el.userId ? el.userId : thisUserId}
                </p>
                {(el.userId === thisUserId || !el.userId) && (
                  <button
                    data-remove={el.commentPostId}
                    className={communityHome.commentDeleteBtn}
                    onClick={deleteComment}
                  >
                    <Image
                      src="/delete.svg"
                      alt="삭제 버튼"
                      layout="fill"
                    ></Image>
                  </button>
                )}
              </div>
              <p className={communityHome.commentText}>{el.content}</p>
              <p className={communityHome.commentTime}>
                {el.timestamp.month}. {el.timestamp.date}. {el.timestamp.hour}:
                {el.timestamp.minute}
              </p>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <ModalContainer
          titleText="정말 삭제할까요?"
          yesText="삭제하기"
          yesAction={deleteCommu}
        ></ModalContainer>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  //작성한 전체 글 보기
  const { postId } = context.query;
  const client = await connectToDatabase();
  const communityCollection = client.db().collection("community");
  const community = await communityCollection.findOne({
    commuPostId: postId,
  });
  const textedCommunity = JSON.stringify(community);

  const commentsCollection = client.db().collection("comments");
  const comments = await commentsCollection
    .find({ commuPostId: postId })
    .toArray();
  const textedComments = JSON.stringify(comments);
  return {
    //props로 몽고디비데이터도 전달
    props: { textedCommunity, textedComments },
  };
};

export default CommuIndex;
