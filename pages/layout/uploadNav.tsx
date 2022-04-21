import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import nav from "../../styles/layout/uploadNav.module.scss";
const UploadNav: NextPage = () => {
  return (
    <div className={nav.headerNav}>
      <button>(</button>
      <button>저장</button>
    </div>
  );
};

export default UploadNav;
