import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { connectToDatabase } from "../../lib/db";
import MainPage from "../components/mainPage";
import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import { increment } from "../../slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
const Index = ({ textedDiaries }) => {
  return (
    <MainPage
      title={"Community"}
      main={<Content textedDiaries={textedDiaries}></Content>}
      urlToPost={"/"}
    ></MainPage>
  );
};
const Content = ({ textedDiaries }) => {
  const { data: session, status } = useSession();
  console.log(session);
  const diaryies = JSON.parse(textedDiaries);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      {diaryies.map((diary) => (
        // <Link href={`/privatediary/${diary.postId}`}>
        <a className={styles.dayContainer} custom-attribute={diary.postId}>
          <div className={styles.timeLineStart}></div>
          <div className={styles.timeLineCircle}></div>
          <div className={styles.timeLine}></div>
          <div className={styles.dateOfDiary}>{diary.postingDate}</div>
          <div className={styles.diary}>
            <div>{diary.title}</div>
            {diary.photo.map((img) => (
              <Image src={img} width="500px" height="500px"></Image>
            ))}
            <div className={styles.diaryContent}>{diary.content}</div>
          </div>
        </a>
        // </Link>
      ))}
      <button onClick={() => dispatch(increment())}>increment</button>
      {count}
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
  console.log(`session communityCategory.jsx`);
  console.log(session);
  console.log(session.user.userId);
  //작성한 전체 글 보기
  const client = await connectToDatabase();
  const diaryCollection = client.db().collection("privateDiary");
  const diaries = await diaryCollection
    .find({
      userId: session.user.userId,
    })
    .toArray();
  const textedDiaries = JSON.stringify(diaries);
  return {
    //props로 몽고디비데이터도 전달
    props: { session, textedDiaries },
  };
};
export default Index;
