import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import navi from "../styles/layout/navigations.module.scss";
import header from "../styles/layout/header.module.scss";
import comu from "../styles/pages/community.module.scss";
import Post from "./layout/post";
import MainNav from "./layout/mainNav";

const Community: NextPage = () => {
  return (
    <div className={comu.wrapper}>
      <div className={header.header}>Community</div>
      <div className={comu.mainContainer}>
        <Post></Post>
      </div>
      <MainNav></MainNav>
    </div>
  );
};

export default Community;
