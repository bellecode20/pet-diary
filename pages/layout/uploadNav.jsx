import Head from "next/head";
import Image from "next/image";
import nav from "../../styles/layout/uploadNav.module.scss";
const UploadNav = ({ formId }) => {
  return (
    <div className={nav.headerNav}>
      <button>Back</button>
      <button form={formId}>저장</button>
    </div>
  );
};

export default UploadNav;
