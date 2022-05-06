import Head from "next/head";
import Image from "next/image";
import navi from "../styles/layout/navigations.module.scss";
import header from "../styles/layout/header.module.scss";
import settings from "../styles/pages/settings.module.scss";
import Post from "./layout/post";
import MainNav from "./layout/mainNav";

const Modal = () => {
  return (
    <div>
      <p>로그아웃</p>
      <p>정말 로그아웃 하시겠나요?</p>
      <button>로그아웃</button>
      <button>닫기</button>
    </div>
  );
};

export default Modal;
