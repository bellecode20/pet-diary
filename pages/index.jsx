import Image from "next/image";
import intro from "../styles/pages/intro.module.scss";
import sign from "../styles/pages/signUp.module.scss";
import Link from "next/link";
const Intro = () => {
  return (
    <div className={intro.wrapper}>
      <div className={intro.logoContainer}>
        <Image
          src="/paw.svg"
          layout="fill"
          alt="고양이 발바닥 일러스트"
        ></Image>
      </div>
      <p>고양이와 함께하는 하루하루.</p>
      <Link href={`/settings/signup`}>
        <button className={intro.loginBtn}>시작하기</button>
      </Link>
    </div>
  );
};

export default Intro;
