import { connectToDatabase } from "../../lib/db";
import MainPage from "../layout/mainPage";
import Link from "next/link";
import ImgPreview from "../components/imgPreview";
import { wrapper } from "../../store/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoadDb,
  changeCommuLimit,
} from "../../store/features/loadDbSlice";
import { useState } from "react";
import communityHome from "../../styles/pages/communityHome.module.scss";
import mainPage from "../../styles/layout/mainPage.module.scss";
const Content = ({ textedCommunity }) => {
  const [toggleLoadBtn, setToggleLoadBtn] = useState(false);
  const communityPosts = JSON.parse(textedCommunity);
  const loadDb = useSelector(selectLoadDb);
  const dispatch = useDispatch();
  const handleCommuLoad = () => {
    // 전체 커뮤니티 글을 다 렌더링 한 상태라면 dispatch하지 않는다.
    if (communityPosts.length < loadDb.commuLimit) {
      setToggleLoadBtn(true);
      return;
    }
    dispatch(changeCommuLimit(loadDb.commuLimit + 5));
  };
  const limitedCommunityPosts = communityPosts.reduce((result, post, index) => {
    if (index < loadDb.commuLimit) {
      result.push(post);
    }
    return result;
  }, []);
  return (
    <>
      {limitedCommunityPosts.map((el, i) => (
        <Link href={`/communityCategory/${el.commuPostId}`} key={i}>
          <div className={communityHome.postContainer}>
            <p className={communityHome.title}>{el.title}</p>
            <ImgPreview data={el}></ImgPreview>
            <p className={communityHome.content}>
              <p className={communityHome.isUpdated}>
                {el.isUpdated && "(수정됨)"}
              </p>
              {el.content}
            </p>
            <div className={communityHome.owner}>
              <p className={communityHome.name}>{el.userId}</p>
              <p className={communityHome.date}>
                {el.timestamp.month}. {el.timestamp.date}.
              </p>
            </div>
            <div className={communityHome.social}>
              <div className={communityHome.comment}>
                <Image
                  alt="풍선 모양의 댓글 로고"
                  src="/comment.svg"
                  layout="fill"
                  objectFit="scale-down"
                ></Image>
              </div>
              <p>{el.commentIds.length >= 0 && el.commentIds.length}</p>
            </div>
          </div>
        </Link>
      ))}
      <button onClick={handleCommuLoad} className={mainPage.loadMoreBtn}>
        {toggleLoadBtn ? "모든 글을 확인했어요" : "더보기"}
      </button>
    </>
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
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const client = await connectToDatabase();
    const communityCollection = client.db().collection("community");
    const community = await communityCollection
      .find()
      .sort({ $natural: -1 })
      .toArray();
    const textedCommunity = JSON.stringify(community);
    return {
      //props로 몽고디비데이터도 전달
      props: { textedCommunity },
    };
  }
);
export default Index;
