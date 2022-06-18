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
const WithDrawalFormContent = () => {
  const router = useRouter();
  const oldPwRef = useRef();
  const dispatch = useDispatch();
  dispatch(changeCategory("ErrorCloseModal"));
  const cancelWithdraw = (e) => {
    e.preventDefault();
    router.replace("/privatediaryCategory");
  };
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
        dispatch(modalIsShown(true));
        dispatch(changeContentText("비밀번호가 일치하지 않아요"));
      } else if (data.contentStatus === "008") {
        // 탈퇴성공하면 로그아웃
        dispatch(changeContentText("탈퇴했어요ㅠㅠ"));
        signOut();
      }
    }
  }
  async function submitHandler(e) {
    e.preventDefault();
    const enteredOldPw = oldPwRef.current.value;
    const result = await requestWithdrawal(enteredOldPw);
  }
  return (
    <>
      <div className={sign.title}>
        <p>탈퇴하기</p>
        <div className={sign.description}>
          <p>비밀번호를 입력해주세요.</p>
          <p>작성한 커뮤니티 글과 댓글은 삭제되지 않아요!</p>
        </div>
      </div>
      <form id="withdrawal" onSubmit={submitHandler}>
        <div>
          <label htmlFor="oldPw" className={sign.label}>
            기존 비밀번호
          </label>
          <input
            type="text"
            required
            id="oldPw"
            ref={oldPwRef}
            className={sign.idInput}
          ></input>
        </div>
        <button className={sign.upBtn} onClick={cancelWithdraw}>
          취소
        </button>
        <button className={sign.cancelBtn} form="withdrawal">
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
