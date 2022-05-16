import loading from "../styles/pages/isUploading.module.scss";
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
    <div className={loading.wrapper}>
      {uploadedState ? (
        <div className={loading.modal}>
          <img src="/logo.png" height="100px"></img>
          <p className={loading.title}>작성 완료!</p>
          <button className={loading.button} onClick={handler}>
            홈으로
          </button>
        </div>
      ) : (
        <p className={loading.loadingState}>업로드 중...</p>
      )}
    </div>
  );
};

export default IsUploading;
