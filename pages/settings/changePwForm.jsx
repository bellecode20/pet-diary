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
import { useRouter } from "next/router";
const ChangePwFormContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cancelWithdraw = (e) => {
    e.preventDefault();
    router.replace("/privatediaryCategory");
  };
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
    dispatch(modalIsShown(true));
    dispatch(changeCategory("ErrorCloseModal"));
    if (data.contentStatus === "005") {
      dispatch(changeContentText("로그인을 다시 해주세요"));
    } else if (data.contentStatus === "006") {
      dispatch(
        changeContentText("유저를 찾을 수 없어요. 로그인을 다시 해주세요")
      );
    } else if (data.contentStatus === "007") {
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
          <label htmlFor="oldPw" className={sign.label}>
            기존 비밀번호
          </label>
          <input
            type="password"
            required
            id="oldPw"
            ref={oldPwRef}
            className={sign.idInput}
          ></input>
        </div>
        <div>
          <label htmlFor="newPw" className={sign.label}>
            새로운 비밀번호
          </label>
          <input type="text" required id="newPw" ref={newPwRef}></input>
        </div>
        <button className={sign.upBtn} form="changePw">
          확인
        </button>
        <button className={sign.cancelBtn} onClick={cancelWithdraw}>
          취소
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
