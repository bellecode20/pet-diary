import settings from "../../styles/pages/settings.module.scss";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import MainPage from "../layout/mainPage";
import { useEffect } from "react";
import ModalContainer from "../../components/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { modalIsShown, changeCategory } from "../../store/features/modalSlice";
const SettingsContent = () => {
  const { data: session, status } = useSession();
  const modal = useSelector((state) => state.modal.isShown);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    signOut({ redirect: false, callbackUrl: "/settings/signup" });
    dispatch(modalIsShown(true));
    dispatch(changeCategory("SuccessModal"));
  };
  return (
    <div className={settings.mainContainer}>
      <div className={settings.profile}>
        <p className={settings.menuTitle}>아이디</p>
        <p className={settings.idOfUser}>{session.user.userId}</p>
      </div>
      {/* <div className={settings.history}>
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
      </div> */}
      <div className={settings.account}>
        <p className={settings.menuTitle}>계정 관리</p>
        <div className={settings.accountList}>
          <div className={settings.accountItem} onClick={logoutHandler}>
            <img src="/logo.png" height="20px"></img>
            <p>로그아웃</p>
          </div>
          <Link href="/settings/changePwForm" passHref>
            <a className={settings.accountItem}>
              <img src="/logo.png" height="20px"></img>
              <p>비밀번호 변경</p>
            </a>
          </Link>
          <Link href="/settings/withdrawalForm">
            <div className={settings.accountItem}>
              <img src="/logo.png" height="20px"></img>
              <p>탈퇴하기</p>
            </div>
          </Link>
        </div>
      </div>
      {modal && <ModalContainer></ModalContainer>}
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
