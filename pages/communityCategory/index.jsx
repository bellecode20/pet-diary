import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { connectToDatabase } from "../../lib/db";
import MainPage from "../layout/mainPage";
import Image from "next/image";
import Link from "next/link";
import mainPage from "../../styles/layout/mainPage.module.scss";

const Content = ({ textedCommunity }) => {
  const { data: session, status } = useSession();
  console.log(session);
  const communityPosts = JSON.parse(textedCommunity);
  return (
    <div className={mainPage.commuMainContainer}>
      {communityPosts.map((el) => (
        <Link href={`/communityCategory/${el.commuPostId}`}>
          <div className={mainPage.postContainer}>
            {el.isUpdated && <p>수정됨</p>}
            <p className={mainPage.tag}>{el.title}</p>
            <div className={mainPage.imgsPreview}>
              {el.photo.map((img) => (
                <Image src={img} width="300px" height="100px"></Image>
              ))}
            </div>
            <p className={mainPage.content}>{el.content}</p>
            <div className={mainPage.owner}>
              <p className={mainPage.name}>{el.userId}</p>
              <p className={mainPage.date}>
                {el.timestamp.month}. {el.timestamp.date}
              </p>
            </div>
            <div className={mainPage.social}>
              <span className={mainPage.like}>
                츄르 {el.likeIds.length >= 0 && el.likeIds.length}
              </span>
              <span className={mainPage.comment}>
                댓글 {el.commentIds.length >= 0 && el.commentIds.length}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
const Index = ({ textedCommunity }) => {
  return (
    <MainPage
      title={"Community"}
      main={<Content textedCommunity={textedCommunity}></Content>}
      urlToPost={"/communityCategory/commuPostingForm"}
    ></MainPage>
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
