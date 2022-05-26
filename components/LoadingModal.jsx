import loading from "../styles/pages/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { changeCategory, modalIsShown } from "../store/features/modalSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const LoadingModal = () => {
  const category = useSelector((state) => state.modal.category);
  return (
    <div className={loading.wrapper}>
      <p className={loading.loadingState}>Loading...</p>
    </div>
  );
};
export default LoadingModal;
