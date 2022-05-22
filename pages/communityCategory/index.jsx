import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { connectToDatabase } from "../../lib/db";
import MainPage from "../components/mainPage";
import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import post from "../../styles/layout/post.module.scss";
import Link from "next/link";

const Index = ({ textedCommunity }) => {
  return (
    <MainPage
      title={"Community"}
      main={<Content textedCommunity={textedCommunity}></Content>}
      urlToPost={"/"}
    ></MainPage>
  );
};
const Content = ({ textedCommunity }) => {
  const { data: session, status } = useSession();
  console.log(session);
  const communityPosts = JSON.parse(textedCommunity);
  return (
    <div>
      {communityPosts.map((el) => (
        <Link href={`/communityCategory/${el.commuPostId}`}>
          <div className={post.postContainer}>
            <p className={post.tag}>{el.title}</p>
            <p className={post.content}>{el.content}</p>
            <div className={post.imgsPreview}>
              {el.photo.map((img) => (
                <Image src={img} width="300px" height="100px"></Image>
              ))}
            </div>
            <div className={post.owner}>
              <p className={post.name}>{el.userId}</p>
              <p className={post.date}>
                {el.timestamp.month}. {el.timestamp.date}
              </p>
            </div>
            <div className={post.social}>
              <span className={post.like}>
                {el.likeIds.length === 0 ? "츄르" : el.LikeIds.length}
              </span>
              <span className={post.comment}>
                {el.commentIds.length === 0 ? "댓글" : el.commentIds.length}
              </span>
            </div>
          </div>
        </Link>
      ))}
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
  const client = await connectToDatabase();
  const communityCollection = client.db().collection("community");
  const community = await communityCollection
    .find({
      userId: session.user.userId,
    })
    .sort({ $natural: -1 })
    .limit(5)
    .toArray();
  const textedCommunity = JSON.stringify(community);
  return {
    //props로 몽고디비데이터도 전달
    props: { session, textedCommunity },
  };
};
export default Index;
