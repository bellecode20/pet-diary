import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import header from "../../styles/layout/header.module.scss";
import MainNav from "../layout/mainNav";
import Link from "next/link";
import comu from "../../styles/pages/community.module.scss";

const MainPage = ({ title, main, urlToPost }) => {
  return (
    <div className={comu.wrapper}>
      <div className={header.header}>{title}</div>
      {/* <div className={comu.mainContainer}>{main}</div> */}
      {main}
      <Link href={urlToPost} passHref>
        <a className={styles.addBtn}>+</a>
      </Link>
      <MainNav></MainNav>
    </div>
  );
};

export default MainPage;
