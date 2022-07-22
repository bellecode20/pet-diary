import Image from "next/image";
import btn from "../../styles/components/buttons.module.scss";
const SaveBtn = ({ formId }) => {
  return (
    <div className={btn.container}>
      <button className={btn.importantBtn} form={formId}>
        저장
      </button>
    </div>
  );
};

export default SaveBtn;
