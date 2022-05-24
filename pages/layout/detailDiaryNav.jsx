import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import nav from "../../styles/layout/uploadNav.module.scss";
import DeleteModal from "./deleteModal";
const DetailDiaryNav = ({ setShowModal, mode, postId }) => {
  const router = useRouter();
  const popUpModal = () => {
    setShowModal(true);
  };
  return (
    <div className={nav.headerNav}>
      <button>Back</button>
      {mode === "updateDiary" && (
        <Link href={`/privatediaryCategory/update/${postId}`}>
          <button>수정</button>
        </Link>
      )}
      <button onClick={popUpModal}>삭제</button>
    </div>
  );
};

export default DetailDiaryNav;
