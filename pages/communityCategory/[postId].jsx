import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../lib/db";
import { useRef } from "react";
import { makeId } from "../../components/makeId";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
import { makeTimestamp } from "../../components/makeTimestamp";
import ModalContainer from "../../components/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, modalIsShown } from "../../store/features/modalSlice";
import DetailDiaryNav from "../components/detailDiaryNav";
import CarouselSlide from "../components/carouselSlide";
import post from "../../styles/layout/post.module.scss";

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
  const forceReload = () => {
    router.reload();
  };
  const deleteComment = async (e) => {
    let deleteInfo = {
      commuPostId: commuPost.commuPostId,
      commentPostId: e.target.getAttribute("data-remove"),
    };
    const deleteResult = await requestPostToMongodb(
      "/api/form/deleteComment",
      deleteInfo
    );
    console.log("deleteComment", deleteResult);
    dispatch(modalIsShown(true));
    dispatch(changeCategory("LoadingModal"));
    forceReload();
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
    console.log("deleteCommu", deleteResult);
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
    const postResult = await requestPostToMongodb(
      "/api/form/postComment",
      commentInfo
    );
    dispatch(modalIsShown(true));
    dispatch(changeCategory("LoadingModal"));
    forceReload();
  };
  return (
    <div className={post.wrapper}>
      <DetailDiaryNav userId={commuPost.userId}></DetailDiaryNav>
      <div className={post.mainContainer}>
        <p className={post.tag}>{commuPost.title}</p>
        <CarouselSlide data={commuPost.photo}></CarouselSlide>
        <p className={post.content}>{commuPost.content}</p>
        <div className={post.owner}>
          <p className={post.name}>{commuPost.userId}</p>
          <p className={post.date}>
            {commuPost.timestamp.month}. {commuPost.timestamp.date}
          </p>
        </div>
        <div className={post.social}>
          <span className={post.like}>
            {commuPost.likeIds.length === 0 ? "츄르" : commuPost.LikeIds.length}
          </span>
          <span className={post.comment}>
            {commuPost.commentIds.length === 0
              ? "댓글"
              : `댓글 ${commuPost.commentIds.length}`}
          </span>
        </div>
        {/* </div> */}
        {comments.map((el) => (
          <div className={post.commentContainer}>
            <div className={post.commentTop}>
              <p>{el.userId}</p>
              {el.userId === thisUserId && (
                <button
                  data-remove={el.commentPostId}
                  className={post.commentDeleteBtn}
                  onClick={deleteComment}
                >
                  삭제
                </button>
              )}
            </div>
            <p>{el.content}</p>
            <p className={post.commentTime}>
              {el.timestamp.month}. {el.timestamp.date}. {el.timestamp.hour}:
              {el.timestamp.minute}
            </p>
          </div>
        ))}
      </div>
      <form className={post.commentForm} onSubmit={submitComments}>
        <input type="text" className={post.commentInput} ref={comment}></input>
        <button className={post.commentBtn}>send</button>
      </form>
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
