import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../lib/db";
import post from "../../styles/layout/post.module.scss";
import Image from "next/image";
import { useRef } from "react";
import { makeId } from "../../components/makeId";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
import { makeTimestamp } from "../../components/makeTimestamp";
import Link from "next/link";
import ModalContainer from "../../components/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, modalIsShown } from "../../store/features/modalSlice";

const MainPage = ({ textedCommunity, textedComments }) => {
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
    forceReload();
  };
  const modal = useSelector((state) => state.modal.isShown);
  const dispatch = useDispatch();
  console.log(modal);
  return (
    <div>
      <div className={post.postContainer}>
        <div className={post.menuBtn}>
          <Link href={`/communityCategory/update/${commuPost.commuPostId}`}>
            <button
              data-remove={commuPost.commuPostId}
              className={post.commuDeleteBtn}
            >
              수정
            </button>
          </Link>
          <button
            data-remove={commuPost.commuPostId}
            className={post.commuDeleteBtn}
            onClick={() => {
              dispatch(modalIsShown(true));
              dispatch(changeCategory("GoOrStopModal"));
              console.log(modal);
            }}
          >
            삭제
          </button>
        </div>
        <p className={post.tag}>{commuPost.title}</p>
        <p className={post.content}>{commuPost.content}</p>
        <div className={commuPost.imgsPreview}>
          {commuPost.photo.map((img) => (
            <Image src={img} width="300px" height="100px"></Image>
          ))}
        </div>
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
      </div>
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
  //context로 받아온 것을 getSession으로 꺼내준다. 만약 유저가 인증되었다면 쿠키가 존재한다.
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

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
    props: { session, textedCommunity, textedComments },
  };
};

export default MainPage;
