import loading from "../styles/components/isUploading.module.scss";
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
