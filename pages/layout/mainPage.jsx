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
      {main}
      {urlToPost && (
        <button className={overall.addBtn} onClick={goToPost}>
          <img
            src="/posting.png"
            width="60%"
            height="60%"
            className={overall.addBtnLogo}
          ></img>
        </button>
      )}
      <MainNav></MainNav>
    </div>
  );
};

export default MainPage;
