import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCategory, modalIsShown } from "../../store/features/modalSlice";
import nav from "../../styles/components/uploadNav.module.scss";
import Image from "next/image";
const DetailDiaryNav = ({ userId }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const { postId } = router.query;
  const thisUrl = router.asPath;
  const makeFormCategory = () => {
    let formCategory = "";
    const wasInDiary = thisUrl.includes("/privatediaryCategory");
    if (wasInDiary) {
      formCategory = "privatediaryCategory";
    } else {
      formCategory = "communityCategory";
    }
    return formCategory;
  };
  const goUpdatingForm = () => {
    router.push(`/${makeFormCategory()}/update/${postId}`);
  };
  const [isToggled, setIsToggled] = useState(false);
  const showModal = () => {
    dispatch(modalIsShown(true));
    dispatch(changeCategory("GoOrStopModal"));
  };
  return (
    <div className={nav.headerNav}>
      <button className={nav.basic} onClick={() => router.back()}>
        <div className={nav.imageContainer}>
          <Image src="/history.png" layout="fill"></Image>
        </div>
      </button>
      {userId === session.user.userId && (
        <button
          className={nav.basic}
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <div className={nav.imageContainer}>
            <Image src="/plus.png" layout="fill"></Image>
          </div>
        </button>
      )}
      {isToggled && (
        <div className={nav.hiddenMenu}>
          <button onClick={goUpdatingForm} className={nav.updateBtn}>
            수정
          </button>
          <button className={nav.deleteBtn} onClick={showModal}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailDiaryNav;
