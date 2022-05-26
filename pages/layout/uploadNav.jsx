import { useRouter } from "next/router";
import nav from "../../styles/layout/uploadNav.module.scss";
const UploadNav = ({ formId }) => {
  const router = useRouter();
  const goBack = () => {
    router.push("/");
  };
  return (
    <div className={nav.headerNav}>
      <button className={nav.basic} onClick={goBack}>
        Back
      </button>
      <button className={nav.basic} form={formId}>
        저장
      </button>
    </div>
  );
};

export default UploadNav;
