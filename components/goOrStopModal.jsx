import loading from "../styles/pages/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { modalIsShown } from "../store/features/modalSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SuccessModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalIsShown(false));
  };
  return (
    <div className={loading.wrapper}>
      <div className={loading.modal}>
        <img src="/logo.png" height="100px"></img>
        <p className={loading.title}>정말 삭제할까요?</p>
        <p>다시는 되돌릴 수 없어요</p>
        {/* <button className={loading.LeftHalfButton} onClick={popDownModal}>
          취소하기
        </button>
        <button className={loading.RightHalfButton} onClick={deletePost}>
          삭제하기
        </button> */}
      </div>
    </div>
  );
};
export default SuccessModal;
