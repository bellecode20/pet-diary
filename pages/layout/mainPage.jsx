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
      <MainNav></MainNav>
      <div className={overall.mainContainer}>{main}</div>
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
