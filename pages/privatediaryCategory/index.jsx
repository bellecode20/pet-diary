import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { connectToDatabase } from "../../lib/db";
import MainPage from "../layout/mainPage";
import ImgPreview from "../components/imgPreview";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDiaryLimit,
  selectLoadDb,
} from "../../store/features/loadDbSlice";
import { useState } from "react";
import styles from "../../styles/Home.module.scss";
const CommuContent = ({ textedDiaries }) => {
  const [toggleLoadBtn, setToggleLoadBtn] = useState(false);
  const diaryies = JSON.parse(textedDiaries);
  const dispatch = useDispatch();
  const loadDb = useSelector(selectLoadDb);
  const handleDiaryLoad = () => {
    if (diaryies.length < loadDb.diaryLimit) {
      setToggleLoadBtn(true);
      return;
    }
    dispatch(changeDiaryLimit(loadDb.diaryLimit + 5));
  };
  const limitedDiaryPosts = diaryies.reduce((result, post, index) => {
    if (index < loadDb.diaryLimit) {
      result.push(post);
    }
    return result;
  }, []);
  const { data: session, status } = useSession();
  return (
    <div className={styles.mainContainer}>
      {limitedDiaryPosts.map((diary, i) => (
        <Link href={`/privatediaryCategory/${diary.postId}`} key={i}>
          <a className={styles.dayContainer} custom-attribute={diary.postId}>
            <div className={styles.dateOfDiary}>
              <span>{diary.postingDate}</span>
            </div>
            <ImgPreview data={diary}></ImgPreview>
            <div className={styles.diary}>
              <div className={styles.diaryTitle}>{diary.title}</div>
              <div className={styles.diaryContent}>{diary.content}</div>
            </div>
          </a>
        </Link>
      ))}
      <button onClick={handleDiaryLoad} className={styles.loadMoreBtn}>
        {toggleLoadBtn ? "모든 글을 확인했어요" : "더보기"}
      </button>
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
    .sort({ $natural: -1 })
    .toArray();
  const textedDiaries = JSON.stringify(diaries);
  return {
    //props로 몽고디비데이터도 전달
    props: { session, textedDiaries },
  };
};
export default Home;
