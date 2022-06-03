import { useSelector } from "react-redux";
import sign from "../../styles/pages/signUp.module.scss";
import ModalContainer from "../../components/ModalContainer";
const Account = ({ main }) => {
  const modal = useSelector((state) => state.modal.isShown);
  console.log(modal);
  return (
    <>
      <div className={sign.wrapper}>
        <img
          className={sign.logo}
          src="/logo.png"
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
