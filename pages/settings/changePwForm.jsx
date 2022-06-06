import sign from "../../styles/pages/signUp.module.scss";
import { useRef } from "react";
import Account from "../layout/account";
import ModalContainer from "../../components/ModalContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  modalIsShown,
  changeCategory,
  changeContentText,
} from "../../store/features/modalSlice";
const ChangePwFormContent = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.isShown);
  const oldPwRef = useRef();
  const newPwRef = useRef();
  async function changePw(enteredOldPw, enteredNewPw) {
    let oldAndNewPws = {
      oldPw: enteredOldPw,
      newPw: enteredNewPw,
    };
    const response = await fetch("/api/user/changePw", {
      method: "PATCH",
      body: JSON.stringify(oldAndNewPws),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(changeCategory("ErrorCloseModal"));
    dispatch(modalIsShown(true));
    if (data.contentStatus === "005") {
      dispatch(changeContentText("로그인을 다시 해주세요"));
    } else if (data.contentStatus === "006") {
      dispatch(
        changeContentText("유저를 찾을 수 없어요. 로그인을 다시 해주세요")
      );
    } else if (data.contentStatus === "007") {
      dispatch(modalIsShown(true));
      dispatch(changeContentText("비밀번호가 일치하지 않아요"));
    } else if (data.contentStatus === "200") {
      dispatch(changeCategory("SuccessModal"));
    }
  }
  async function submitHandler(e) {
    e.preventDefault();
    const enteredOldPw = oldPwRef.current.value;
    const enteredNewPw = newPwRef.current.value;
    const result = await changePw(enteredOldPw, enteredNewPw);
  }
  return (
    <>
      <p className={sign.title}>비밀번호 변경</p>
      <form id="changePw" onSubmit={submitHandler}>
        <div>
          <label htmlFor="oldPw">기존 비밀번호</label>
          <input
            type="text"
            required
            id="oldPw"
            ref={oldPwRef}
            className={sign.idInput}
          ></input>
        </div>
        <div>
          <label htmlFor="newPw">새로운 비밀번호</label>
          <input type="text" required id="newPw" ref={newPwRef}></input>
        </div>
        <button className={sign.upBtn} form="changePw">
          확인
        </button>
      </form>
      {modal && <ModalContainer></ModalContainer>}
    </>
  );
};

const ChangePwForm = () => {
  return <Account main={<ChangePwFormContent></ChangePwFormContent>}></Account>;
};

export default ChangePwForm;
