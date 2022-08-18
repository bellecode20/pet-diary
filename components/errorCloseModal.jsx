import loading from "../styles/components/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { changeCategory, modalIsShown } from "../store/features/modalSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
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
        <div className={loading.imgContainer}>
          <Image
            src="/cat--error.svg"
            layout="fill"
            alt="슬퍼하는 고양이 일러스트"
          ></Image>
        </div>
        <div className={loading.textContainer}>
          <p className={loading.title}>앗!</p>
          <p className={loading.content}>{contentText}</p>
        </div>
        <button
          className={`${loading.yesButton} ${loading.oneButton}`}
          onClick={handleClose}
          tabIndex="1"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
export default ErrorCloseModal;
