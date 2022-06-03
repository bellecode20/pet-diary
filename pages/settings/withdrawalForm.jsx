import sign from "../../styles/pages/signUp.module.scss";
import { useRef, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Account from "../layout/account";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  modalIsShown,
  changeCategory,
  changeContentText,
} from "../../store/features/modalSlice";
import ModalContainer from "../../components/ModalContainer";
const WithDrawalFormContent = () => {
  const modal = useSelector((state) => state.modal.isShown);
  console.log(modal);
  const oldPwRef = useRef();
  const newPwRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(changeCategory("ErrorCloseModal"));
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
    const data = await response.json().catch((e) => {
      //mongodb에서 삭제를 못했거나 알 수 없는 오류가 생겼을 때 이다.
      console.error(e);
    });
    if (data.error) {
      console.error(data.error);
      dispatch(modalIsShown(true));
      dispatch(changeContentText("오류가 발생했어요. 다시 시도해주세요"));
    }
    if (data.contentStatus) {
      dispatch(modalIsShown(true));
      if (data.contentStatus === "005") {
        dispatch(changeContentText("로그인을 다시 해주세요"));
      } else if (data.contentStatus === "006") {
        dispatch(
          changeContentText("유저를 찾을 수 없어요. 로그인을 다시 해주세요")
        );
      } else if (data.contentStatus === "007") {
        console.log("007");
        console.log(modal);
        dispatch(modalIsShown(true));
        dispatch(changeContentText("비밀번호가 일치하지 않아요"));
      } else if (data.contentStatus === "008") {
        // 탈퇴성공하면 로그아웃
        dispatch(changeContentText("탈퇴했어요ㅠㅠ"));
        signOut();
      }
    }
    console.log(`data withdrawal`);
    console.log(data);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const enteredOldPw = oldPwRef.current.value;
    const result = await requestWithdrawal(enteredOldPw);
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
