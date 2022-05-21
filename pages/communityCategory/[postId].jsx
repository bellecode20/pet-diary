import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../lib/db";
import post from "../../styles/layout/post.module.scss";
import Image from "next/image";

const MainPage = ({ textedCommunity }) => {
  const router = useRouter();
  const commuPost = JSON.parse(textedCommunity);

  return (
    <div>
      <div className={post.postContainer}>
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
              : commuPost.commentIds.length}
          </span>
        </div>
      </div>
      <div>댓글창</div>
      <form className={post.commentForm}>
        <input type="text" className={post.commentInput}></input>
        <button className={post.commentBtn}>send</button>
      </form>
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
    postId: postId,
  });
  const textedCommunity = JSON.stringify(community);
  return {
    //props로 몽고디비데이터도 전달
    props: { session, textedCommunity },
  };
};

export default MainPage;
