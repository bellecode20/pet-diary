import { useSelector } from "react-redux";
import sign from "../../styles/pages/signUp.module.scss";
import ModalContainer from "../../components/ModalContainer";
const Account = ({ main }) => {
  const modal = useSelector((state) => state.modal.isShown);
  return (
    <>
      <div className={sign.wrapper}>
        <div className={sign.mainContainer}>{main}</div>
      </div>
      {modal && <ModalContainer></ModalContainer>}
    </>
  );
};

export default Account;
