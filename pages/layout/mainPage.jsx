import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import MainNav from "../components/mainNav";
import overall from "../../styles/layout/mainPage.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
const MainPage = ({ title, main, urlToPost }) => {
  const router = useRouter();
  const goToPost = () => {
    router.push(urlToPost);
  };
  return (
    <div className={overall.wrapper}>
      <div className={overall.header}>{title}</div>
      <div className={overall.mainContainer}>{main}</div>
      {urlToPost && (
        <button className={overall.addBtn} onClick={goToPost}>
          <div className={overall.imageContainer}>
            <Image src="/posting.png" alt="글 쓰기 버튼" layout="fill"></Image>
          </div>
        </button>
      )}
      <MainNav></MainNav>
    </div>
  );
};

export default MainPage;
