import Head from "next/head";
import Image from "next/image";
import navi from "../styles/layout/navigations.module.scss";
import header from "../styles/layout/header.module.scss";
import settings from "../styles/pages/settings.module.scss";
import Post from "./layout/post";
import MainNav from "./layout/mainNav";
import { signOut } from "next-auth/react";
const Settings = () => {
  const logoutHandler = () => {
    signOut();
    console.log("signOut");
  };
  return (
    <div className={settings.wrapper}>
      <div className={header.header}>Setting</div>
      <div className={settings.mainContainer}>
        <div className={settings.profile}>
          <img src="/diary_cat_01.jpg" height="50px" width="50px"></img>
          <p>스프 집사</p>
        </div>
        <div className={settings.history}>
          <div>
            <img src="/logo.png" height="50px"></img>
            <p>작성 댓글</p>
          </div>
          <div>
            <img src="/logo.png" height="50px"></img>
            <p>작성 게시글</p>
          </div>
          <div>
            <img src="/logo.png" height="50px"></img>
            <p>츄르 목록</p>
          </div>
        </div>
        <div className={settings.account}>
          <p className={settings.menuTitle}>계정 관리</p>
          <div className={settings.accountList}>
            <div className={settings.accountItem} onClick={logoutHandler}>
              <img src="/logo.png" height="20px"></img>
              <p>로그아웃</p>
            </div>
            <div className={settings.accountItem}>
              <img src="/logo.png" height="20px"></img>
              <p>비밀번호 변경</p>
            </div>
            <div className={settings.accountItem}>
              <img src="/logo.png" height="20px"></img>
              <p>탈퇴하기</p>
            </div>
          </div>
        </div>
      </div>
      <MainNav></MainNav>
    </div>
  );
};

export default Settings;
