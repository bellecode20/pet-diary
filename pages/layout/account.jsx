import { useSelector } from "react-redux";
import sign from "../../styles/pages/signUp.module.scss";
import ModalContainer from "../../components/ModalContainer";
import DetailDiaryNav from "../components/detailDiaryNav";
const Account = ({ main }) => {
  const modal = useSelector((state) => state.modal.isShown);
  return (
    <>
      <div className={sign.wrapper}>
        <img
          className={sign.logo}
          src="/cat--success.svg"
          height="100"
          width="100"
          alt="기뻐하는 고양이 일러스트"
        ></img>
        {main}
      </div>
      {modal && <ModalContainer></ModalContainer>}
    </>
  );
};

export default Account;
