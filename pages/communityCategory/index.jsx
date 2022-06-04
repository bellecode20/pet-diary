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
    <div className={mainPage.commuMainContainer}>
      {limitedCommunityPosts.map((el, i) => (
        <Link href={`/communityCategory/${el.commuPostId}`} key={i}>
          <div className={mainPage.postContainer}>
            <p className={mainPage.isUpdated}> {el.isUpdated && "(수정됨)"}</p>
            <p className={mainPage.title}>{el.title}</p>
            <ImgPreview data={el}></ImgPreview>
            <p className={mainPage.content}>{el.content}</p>
            <div className={mainPage.owner}>
              <p className={mainPage.name}>{el.userId}</p>
              <p className={mainPage.date}>
                {el.timestamp.month}. {el.timestamp.date}.
              </p>
            </div>
            <div className={mainPage.social}>
              {/* <span className={mainPage.like}>
                츄르 {el.likeIds.length >= 0 && el.likeIds.length}
              </span> */}
              <span className={mainPage.comment}>
                <Image src="/comment.svg" width="30" height="30"></Image>
                {el.commentIds.length >= 0 && el.commentIds.length}
              </span>
            </div>
          </div>
        </Link>
      ))}
      <button onClick={handleCommuLoad} className={mainPage.loadMoreBtn}>
        {toggleLoadBtn ? "모든 글을 확인했어요" : "더보기"}
      </button>
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
