import loading from "../../styles/components/isUploading.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
const DeleteDecisionModal = ({
  userId,
  postId,
  photoPublicId,
  setIsLoading,
  setShowModal,
  setShowSuccessModal,
  showSuccessModal,
}) => {
  useEffect(() => {
    setShowSuccessModal(showSuccessModal);
  }, [showSuccessModal]);
  const popDownModal = () => {
    setShowModal(false);
  };
  async function deletePost() {
    popDownModal();
    setIsLoading(true);
    let postInfo = {
      userId: userId,
      postId: postId,
      photoPublicId: photoPublicId,
    };
    console.log(postInfo);
    const result = await requestPostToMongodb(
      "../api/form/deleteDiary",
      postInfo
    );
    setShowSuccessModal(true);
    console.log(`data deleteModal`);
    console.log(data);
  }
  return (
    <div className={loading.wrapper}>
      <div className={loading.modal}>
        <img src="/logo.png" height="100px"></img>
        <p className={loading.title}>정말 삭제할까요?</p>
        <p>다시는 되돌릴 수 없어요</p>
        <button className={loading.LeftHalfButton} onClick={popDownModal}>
          취소하기
        </button>
        <button className={loading.RightHalfButton} onClick={deletePost}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default DeleteDecisionModal;
