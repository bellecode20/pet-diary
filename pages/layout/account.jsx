import { useSelector } from "react-redux";
import sign from "../../styles/pages/signUp.module.scss";
import ModalContainer from "../../components/ModalContainer";
const Account = ({ main }) => {
  const modal = useSelector((state) => state.modal.isShown);
  return (
    <>
      <div className={sign.wrapper}>
        <div className={sign.mainContainer}>
          {/* <img
            className={sign.logo}
            src="/cat--success.svg"
            height="100"
            width="100"
            alt="기뻐하는 고양이 일러스트"
          ></img> */}
          {main}
        </div>
      </div>
      {modal && <ModalContainer></ModalContainer>}
    </>
  );
};

export default Account;
