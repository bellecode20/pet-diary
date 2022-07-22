import { useRouter } from "next/router";
import Image from "next/image";
import nav from "../../styles/components/uploadNav.module.scss";
import overall from "../../styles/layout/mainPage.module.scss";
const UploadNav = ({ formId }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className={nav.headerNav}>
      <button className={nav.basic} onClick={goBack}>
        <div className={overall.imageContainer}>
          <Image src="/history.png" alt="뒤로가기 버튼" layout="fill"></Image>
        </div>
      </button>
      {/* <button className={nav.basic} form={formId}>
        저장
      </button> */}
    </div>
  );
};

export default UploadNav;
