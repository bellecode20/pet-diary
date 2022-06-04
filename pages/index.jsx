import Image from "next/image";
import UploadNav from "./components/uploadNav";
import intro from "../styles/pages/intro.module.scss";
import Link from "next/link";
const Intro = () => {
  return (
    <div className={intro.wrapper}>
      <img src="/paw.svg" height="200px"></img>
      <p>고양이와 함께하는 하루하루.</p>
      <div className={intro.btns}>
        <Link href={`/settings/signup`}>
          <button className={intro.loginBtn}>시작하기</button>
        </Link>
        {/* <Link href={`/settings/signup`}>
          <button className={intro.signupBtn}>가입하기</button>
        </Link> */}
      </div>
    </div>
  );
};

export default Intro;
