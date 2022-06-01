import sign from "../../styles/pages/signUp.module.scss";
import { useRef, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Account from "../layout/account";
import { signOut } from "next-auth/react";
const WithDrawalFormContent = () => {
  const oldPwRef = useRef();
  const newPwRef = useRef();
  const router = useRouter();
  async function requestWithdrawal(enteredOldPw) {
    let oldAndNewPws = {
      oldPw: enteredOldPw,
    };
    const response = await fetch("/api/user/withdrawal", {
      method: "PATCH",
      body: JSON.stringify(oldAndNewPws),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const next = await signOut();
    console.log(`data withdrawal`);
    console.log(data);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const enteredOldPw = oldPwRef.current.value;
    const result = await requestWithdrawal(enteredOldPw);
    console.log(`result`);
    console.log(result);
  }
  return (
    <>
      <p className={sign.title}>탈퇴하기</p>
      <p>비밀번호를 입력해주세요</p>
      <p>이전에 작성했던 커뮤니티 글과 댓글은 삭제되지 않습니다.</p>
      <form id="withdrawal" onSubmit={submitHandler}>
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
        <button className={sign.upBtn} form="withdrawal">
          탈퇴하기
        </button>
      </form>
    </>
  );
};
const WithDrawalForm = () => {
  return (
    <Account main={<WithDrawalFormContent></WithDrawalFormContent>}></Account>
  );
};
export default WithDrawalForm;
