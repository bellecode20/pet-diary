import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import styles from "../../styles/Home.module.scss";
import Link from "next/link";
import { connectToDatabase } from "../../lib/db";
import MainPage from "../layout/mainPage";
import ImgPreview from "../components/imgPreview";
const CommuContent = ({ textedDiaries }) => {
  // const { data: session, status } = useSession();
  const diaryies = JSON.parse(textedDiaries);
  return (
    <div className={styles.mainContainer}>
      {diaryies.map((diary) => (
        <Link href={`/privatediaryCategory/${diary.postId}`}>
          <a className={styles.dayContainer} custom-attribute={diary.postId}>
            <div className={styles.timeLineStart}></div>
            <div className={styles.timeLineCircle}></div>
            <div className={styles.timeLine}></div>
            <div className={styles.dateOfDiary}>{diary.postingDate}</div>
            <div className={styles.diary}>
              <div>{diary.title}</div>
              <ImgPreview data={diary}></ImgPreview>
              <div className={styles.diaryContent}>{diary.content}</div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

const Home = ({ textedDiaries }) => {
  return (
    <MainPage
      title={"Diary"}
      main={<CommuContent textedDiaries={textedDiaries}></CommuContent>}
      urlToPost={"/privatediaryCategory/postingForm"}
    ></MainPage>
  );
};

export const getServerSideProps = async (context) => {
  //context로 받아온 것을 getSession으로 꺼내준다. 만약 유저가 인증되었다면 쿠키가 존재한다.
  const session = await getSession({ req: context.req });
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
export default Home;
