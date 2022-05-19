import loading from "../../styles/pages/isUploading.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const DeleteModal = ({
  isLoading,
  setIsLoading,
  showSuccessModal,
  setShowSuccessModal,
}) => {
  const router = useRouter();

  const handler = () => {
    router.push("/");
    setShowSuccessModal(false);
  };
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setShowSuccessModal(showSuccessModal);
  }, [showSuccessModal]);
  return (
    <div className={loading.wrapper}>
      {showSuccessModal ? (
        <div className={loading.modal}>
          <img src="/logo.png" height="100px"></img>
          <p className={loading.title}>작성 완료!</p>
          <button className={loading.button} onClick={handler}>
            홈으로
          </button>
        </div>
      ) : (
        <p className={loading.loadingState}>진행 중...</p>
      )}
    </div>
  );
};

export default DeleteModal;
