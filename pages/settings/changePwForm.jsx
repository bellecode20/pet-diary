import sign from "../../styles/pages/signUp.module.scss";
import { useRef, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const ChangePwForm = () => {
  const oldPwRef = useRef();
  const newPwRef = useRef();
  const router = useRouter();
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
    console.log(`data changePwForm`);
    console.log(data);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const enteredOldPw = oldPwRef.current.value;
    const enteredNewPw = newPwRef.current.value;
    const result = await changePw(enteredOldPw, enteredNewPw);
    // console.log(`result`);
    // console.log(result);
  }
  return (
    <div className={sign.wrapper}>
      <img
        className={sign.logo}
        src="/logo.png"
        height="100px"
        width="100px"
      ></img>
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
    </div>
  );
};
export const getServerSideProps = async (context) => {
  //context로 받아온 것을 getSession으로 꺼내준다. 만약 유저가 인증되었다면 쿠키가 존재한다.
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  console.log(`session index.jsx`);
  console.log(session);
  return {
    props: { session },
  };
};
export default ChangePwForm;