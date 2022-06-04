import loading from "../styles/components/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { changeCategory, modalIsShown } from "../store/features/modalSlice";
import { useSelector } from "react-redux";
const ErrorCloseModal = () => {
  const dispatch = useDispatch();
  const contentText = useSelector((state) => state.modal.contentText);
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalIsShown(false));
    dispatch(changeCategory(""));
  };
  return (
    <div className={loading.wrapper}>
      <div className={loading.modal}>
        <img src="/cat--error.svg" height="50%"></img>
        <p className={loading.title}>앗!</p>
        <p className={loading.content}>{contentText}</p>
        <button className={loading.button} onClick={handleClose}>
          닫기
        </button>
      </div>
    </div>
  );
};
export default ErrorCloseModal;
