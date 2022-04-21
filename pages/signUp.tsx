import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import navi from "../styles/layout/navigations.module.scss";
import UploadNav from "./layout/uploadNav";
import sign from "../styles/pages/signUp.module.scss";
const Intro: NextPage = () => {
  return (
    <div className={sign.wrapper}>
      <img
        className={sign.logo}
        src="/logo.png"
        height="100px"
        width="100px"
      ></img>
      <p className={sign.title}>가입하기</p>
      <p className={sign.content}>간편한 로그인으로 일기를 백업하세요</p>
      <button>카카오 로그인</button>
    </div>
  );
};

export default Intro;
