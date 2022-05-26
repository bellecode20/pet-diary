import loading from "../styles/pages/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { changeCategory, modalIsShown } from "../store/features/modalSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SuccessModal = ({ children }) => {
  const router = useRouter();
  const thisUrl = router.asPath;
  let nextUrl = "";
  const makeNextUrl = () => {
    const wasForUpdate = thisUrl.includes("/update");
    if (wasForUpdate) {
      //글을 수정하는 경우라면, 수정한 글로 이동한다.
      nextUrl = thisUrl.replace("/update", "");
    } else if (thisUrl.includes("/communityCategory")) {
      nextUrl = "/communityCategory";
    } else if (thisUrl.includes("/privatediaryCategory")) {
      nextUrl = "/";
    }
    return nextUrl;
  };
  const category = useSelector((state) => state.modal.category);
  return (
    <div className={loading.wrapper}>
      <p className={loading.loadingState}>Loading...</p>
    </div>
  );
};
export default SuccessModal;
