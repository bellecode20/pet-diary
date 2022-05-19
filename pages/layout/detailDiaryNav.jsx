import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import nav from "../../styles/layout/uploadNav.module.scss";
import DeleteModal from "./deleteModal";
const DetailDiaryNav = ({ setShowModal }) => {
  const router = useRouter();
  const popUpModal = () => {
    setShowModal(true);
  };
  return (
    <div className={nav.headerNav}>
      <button>Back</button>
      <button>수정</button>
      <button onClick={popUpModal}>삭제</button>
    </div>
  );
};

export default DetailDiaryNav;
