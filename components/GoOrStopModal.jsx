import loading from "../styles/components/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { modalIsShown } from "../store/features/modalSlice";

const GoOrStopModal = ({ titleText, yesText, yesAction }) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalIsShown(false));
  };
  return (
    <div className={loading.wrapper}>
      <div className={loading.modal}>
        <img src="/paw.svg" height="100px"></img>
        <p className={loading.title}>{titleText}</p>
        <p>다시는 되돌릴 수 없어요</p>
        <button className={loading.LeftHalfButton} onClick={handleClose}>
          취소하기
        </button>
        <button className={loading.RightHalfButton} onClick={yesAction}>
          {yesText}
        </button>
      </div>
    </div>
  );
};
export default GoOrStopModal;
