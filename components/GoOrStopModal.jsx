import loading from "../styles/components/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { modalIsShown } from "../store/features/modalSlice";
const GoOrStopModal = ({ titleText, yesText, yesAction }) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalIsShown(false));
    document.body.style.overflow = "auto";
  };
  document.body.style.overflow = "hidden";
  return (
    <div className={loading.wrapper}>
      <div className={loading.modal}>
        <div className={loading.imgContainer}>
          <img src="/paw.svg" layout="fill" alt="고양이 발바닥 일러스트"></img>
        </div>
        <div className={loading.textContainer}>
          <p className={loading.title}>{titleText}</p>
          <p className={loading.content}>다시는 되돌릴 수 없어요.</p>
        </div>
        <button className={loading.yesButton} onClick={yesAction}>
          {yesText}
        </button>
        <button className={loading.noButton} onClick={handleClose}>
          취소하기
        </button>
      </div>
    </div>
  );
};
export default GoOrStopModal;
