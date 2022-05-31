import sign from "../../styles/pages/signUp.module.scss";
import { useRef, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Account from "../layout/account";
import ModalContainer from "../../components/ModalContainer";
import { useSelector, useDispatch } from "react-redux";
import { changeCategory, modalIsShown } from "../../store/features/modalSlice";
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
    console.log(data);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const enteredOldPw = oldPwRef.current.value;
    const enteredNewPw = newPwRef.current.value;
    const result = await changePw(enteredOldPw, enteredNewPw);
    dispatch(modalIsShown(true));
    // dispatch(changeCategory("SuccessModal"));
    console.log(`result`);
    console.log(result);
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
