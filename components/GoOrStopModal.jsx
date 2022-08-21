import loading from "../styles/components/isUploading.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalIsShown } from "../store/features/modalSlice";
import { useRef, useEffect } from "react";
const GoOrStopModal = ({ titleText, yesText, yesAction }) => {
  const focusedRef = useRef();
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalIsShown(false));
  };
  useEffect(() => {
    focusedRef.current.focus();
  }, []);
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
        <button
          className={loading.yesButton}
          onClick={yesAction}
          ref={focusedRef}
        >
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
