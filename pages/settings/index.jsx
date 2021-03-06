import settings from "../../styles/pages/settings.module.scss";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import MainPage from "../layout/mainPage";
import { useDispatch } from "react-redux";
import { modalIsShown, changeCategory } from "../../store/features/modalSlice";
const SettingsContent = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(modalIsShown(true));
    dispatch(changeCategory("LoadingModal"));
    signOut({ redirect: false, callbackUrl: "/settings/signup" });
    dispatch(modalIsShown(false));
  };
  return (
    <div className={settings.mainContainer}>
      <div className={settings.profile}>
        <p className={settings.menuTitle}>아이디</p>
        <p className={settings.idOfUser}>{session.user.userId}</p>
      </div>
      <div className={settings.account}>
        <p className={settings.menuTitle}>계정 관리</p>
        <div className={settings.accountList}>
          <div className={settings.accountItem} onClick={logoutHandler}>
            <p>- 로그아웃</p>
          </div>
          <Link href="/settings/changePwForm" passHref>
            <a className={settings.accountItem}>
              <p>- 비밀번호 변경</p>
            </a>
          </Link>
          <Link href="/settings/withdrawalForm">
            <div className={settings.accountItem}>
              <p>- 탈퇴하기</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  return <MainPage main={<SettingsContent></SettingsContent>}></MainPage>;
};

export default Settings;
