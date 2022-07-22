import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import MainNav from "../components/mainNav";
import overall from "../../styles/layout/mainPage.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
const MainPage = ({ main, urlToPost }) => {
  const router = useRouter();
  const goToPost = () => {
    router.push(urlToPost);
  };
  return (
    <div className={overall.wrapper}>
      {/* {urlToPost && (
        <button className={overall.addBtn} onClick={goToPost}>
          <div className={overall.imageContainer}>
            <Image src="/plus.png" alt="글 쓰기 버튼" layout="fill"></Image>
          </div>
        </button>
      )} */}
      <MainNav></MainNav>
      <div className={overall.mainContainer}>
        {main}
        {/* {urlToPost && (
          <button className={overall.addBtn} onClick={goToPost}>
            <div className={overall.imageContainer}>
              <Image src="/plus.png" alt="글 쓰기 버튼" layout="fill"></Image>
            </div>
          </button>
        )} */}
      </div>
      {urlToPost && (
        <button className={overall.addBtn} onClick={goToPost}>
          <div className={overall.imageContainer}>
            <Image src="/plus.png" alt="글 쓰기 버튼" layout="fill"></Image>
          </div>
        </button>
      )}
    </div>
  );
};

export default MainPage;
