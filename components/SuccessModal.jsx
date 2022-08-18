import loading from "../styles/components/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { changeCategory, modalIsShown } from "../store/features/modalSlice";
import { useRouter } from "next/router";

const SuccessModal = () => {
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
      nextUrl = "/privatediaryCategory";
    } else nextUrl = "/privatediaryCategory";
    return nextUrl;
  };
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalIsShown(false));
    dispatch(changeCategory(""));
    if (thisUrl.includes("/signup")) router.replace("/privatediaryCategory");
    router.replace(makeNextUrl());
  };
  return (
    <div className={loading.wrapper}>
      <div className={loading.modal}>
        <div className={loading.imgContainer}>
          <img
            src="/cat--success.svg"
            layout="fill"
            alt="기뻐하는 고양이 일러스트"
          ></img>
        </div>
        <div className={loading.textContainer}>
          <p className={loading.title}>완료!</p>
        </div>
        <button
          className={`${loading.yesButton} ${loading.oneButton}`}
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};
export default SuccessModal;
