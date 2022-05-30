import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import MainNav from "../components/mainNav";
import overall from "../../styles/layout/mainPage.module.scss";
import { useRouter } from "next/router";

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
          +
        </button>
      )}
      <MainNav></MainNav>
    </div>
  );
};

export default MainPage;
