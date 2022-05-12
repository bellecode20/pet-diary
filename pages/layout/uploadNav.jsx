import Head from "next/head";
import Image from "next/image";
import nav from "../../styles/layout/uploadNav.module.scss";
const UploadNav = () => {
  return (
    <div className={nav.headerNav}>
      <button>Back</button>
      <button form="posting">저장</button>
    </div>
  );
};

export default UploadNav;
