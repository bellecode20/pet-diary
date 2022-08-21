import loading from "../styles/components/isUploading.module.scss";
import { useDispatch } from "react-redux";
import { changeCategory, modalIsShown } from "../store/features/modalSlice";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
const SuccessModal = () => {
  const router = useRouter();
  const thisUrl = router.asPath;
  const focusedRef = useRef();
  const makeNextUrl = () => {
    let nextUrl = "";
    if (thisUrl.includes("/signup")) nextUrl = "/privatediaryCategory";
    else if (thisUrl.includes("/communityCategory")) {
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
    const wasForUpdate = thisUrl.includes("/update");
    // 수정을 한 경우에는 이전 페이지인 상세글 페이지로 뒤로간다. 수정했던 대로 글이 업데이트 되어있다.
    if (wasForUpdate) return router.back();
    router.replace(makeNextUrl());
  };
  useEffect(() => {
    focusedRef.current.focus();
  }, []);
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
          ref={focusedRef}
        >
          닫기
        </button>
      </div>
    </div>
  );
};
export default SuccessModal;
