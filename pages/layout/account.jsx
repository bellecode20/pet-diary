import { useSelector } from "react-redux";
import sign from "../../styles/pages/signUp.module.scss";
import ModalContainer from "../../components/ModalContainer";
const Account = ({ main }) => {
  const modal = useSelector((state) => state.modal.isShown);
  return (
    <>
      <div className={sign.wrapper}>
        <img
          className={sign.logo}
          src="/cat--success.svg"
          height="100px"
          width="100px"
        ></img>
        {main}
      </div>
      {modal && <ModalContainer></ModalContainer>}
    </>
  );
};

export default Account;
