import settings from "../../styles/pages/settings.module.scss";
import { signOut } from "next-auth/react";
import Link from "next/link";
import MainPage from "../layout/mainPage";

const SettingsContent = () => {
  const logoutHandler = () => {
    signOut();
    console.log("signOut");
  };
  return (
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
          <Link href="/changePwForm" passHref>
            <a className={settings.accountItem}>
              <img src="/logo.png" height="20px"></img>
              <p>비밀번호 변경</p>
            </a>
          </Link>
          <div className={settings.accountItem}>
            <img src="/logo.png" height="20px"></img>
            <p>탈퇴하기</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  return (
    <MainPage
      title="Settings"
      main={<SettingsContent></SettingsContent>}
    ></MainPage>
  );
};

export default Settings;
