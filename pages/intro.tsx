import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import navi from "../styles/layout/navigations.module.scss";
import UploadNav from "./layout/uploadNav";
import intro from "../styles/pages/intro.module.scss";
const Intro: NextPage = () => {
  return (
    <div className={intro.wrapper}>
      <img src="/logo.png" height="200px"></img>
      <p>고양이와 함께하는 하루하루.</p>
      <div className={intro.btns}>
        <button className={intro.loginBtn}>로그인</button>
        <button className={intro.signupBtn}>가입하기</button>
      </div>
    </div>
  );
};

export default Intro;
