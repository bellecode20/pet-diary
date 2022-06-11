import Image from "next/image";
import intro from "../styles/pages/intro.module.scss";
import Link from "next/link";
const Intro = () => {
  return (
    <div className={intro.wrapper}>
      <Image
        src="/paw.svg"
        width="200"
        height="200"
        alt="고양이 발바닥 일러스트"
      ></Image>
      <p>고양이와 함께하는 하루하루.</p>
      <div className={intro.btns}>
        <Link href={`/settings/signup`}>
          <button className={intro.loginBtn}>시작하기</button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
