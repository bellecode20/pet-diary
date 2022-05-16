import form from "../styles/pages/formOfDiary.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const IsUploading = ({ uploaded, setUploaded, showModal, setShowModal }) => {
  const [uploadedState, setUploadedState] = useState(uploaded);
  const router = useRouter();
  const handler = () => {
    // setUploaded(false);
    // setShowModal(false);
    router.push("/");
  };
  useEffect(() => {
    setUploadedState(uploaded);
  }, [uploaded]);
  return (
    <div>
      {uploadedState ? <p>업로드 완료</p> : <p>진행중</p>}
      {uploadedState ? (
        <button onClick={handler}>끝! 홈으로</button>
      ) : (
        <button>로딩 중이에여</button>
      )}
    </div>
  );
};

export default IsUploading;
