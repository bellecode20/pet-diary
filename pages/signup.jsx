import sign from "../styles/pages/signUp.module.scss";
import { useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Intro = () => {
  const [isLogin, setIsLogin] = useState(true);
  const idRef = useRef();
  const pwRef = useRef();
  const router = useRouter();

  const { data: session, status } = useSession();
  const switchAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };
  async function createUser(enteredId, enteredPw) {
    let userInfo = {
      id: enteredId,
      pw: enteredPw,
    };
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(userInfo);
    console.log(data);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const enteredId = idRef.current.value;
    const enteredPw = pwRef.current.value;
    if (isLogin) {
      //로그인을 하는 경우이다.
      const result = await signIn("credentials", {
        redirect: false,
        //callbackUrl: `${window.location.origin}/`,
        id: enteredId,
        pw: enteredPw,
      });
      if (result.error === null) {
        router.push("/");
      }
      console.log(result);
    } else {
      //회원가입을 하는 경우이다.
      try {
        const result = await createUser(enteredId, enteredPw);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className={sign.wrapper}>
      <img
        className={sign.logo}
        src="/logo.png"
        height="100px"
        width="100px"
      ></img>
      <p className={sign.title}>{isLogin ? "로그인" : "가입하기"}</p>
      <form id="signUp" onSubmit={submitHandler}>
        <div>
          <label htmlFor="userId">Id</label>
          <input
            type="text"
            required
            id="userId"
            ref={idRef}
            className={sign.idInput}
          ></input>
        </div>
        <div>
          <label htmlFor="userPw">Password</label>
          <input type="text" required id="userPw" ref={pwRef}></input>
        </div>
        <button className={sign.upBtn} form="signUp">
          확인
        </button>
      </form>
      <button className="switchBtn" onClick={switchAuthMode}>
        {!isLogin ? "로그인하기" : "계정만들기"}
      </button>
      <p>{status === "authenticated" ? "인증됨" : "안됨"}</p>
    </div>
  );
};

export default Intro;
