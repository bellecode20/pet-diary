import sign from "../../styles/pages/signUp.module.scss";
import { useRef, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Account from "../layout/account";
import { useDispatch, useSelector } from "react-redux";
import {
  modalIsShown,
  changeCategory,
  changeContentText,
} from "../../store/features/modalSlice";
import ModalContainer from "../../components/ModalContainer";
const SignUpContent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const idRef = useRef();
  const pwRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  // const modal = useSelector((state) => state.modal.isShown);
  dispatch(changeCategory("ErrorCloseModal"));
  const { data: session, status } = useSession();
  const switchAuthMode = () => {
    setIsLogin((prevState) => !prevState);
    idRef.current.value = "";
    pwRef.current.value = "";
  };
  async function createUser(enteredId, enteredPw) {
    let userInfo = {
      userId: enteredId,
      userPw: enteredPw,
    };
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json().catch((e) => {
      console.error(e);
      dispatch(changeContentText("오류가 발생했어요. 다시 시도해주세요"));
      dispatch(modalIsShown(true));
    });

    if (data.contentStatus === "001") {
      dispatch(changeContentText("아이디와 비밀번호는 7글자 이상이어야 해요"));
      dispatch(modalIsShown(true));
    } else if (data.contentStatus === "002") {
      dispatch(changeContentText("영어나 숫자만 입력해주세요"));
      dispatch(modalIsShown(true));
    } else if (data.contentStatus === "003") {
      {
        dispatch(changeContentText("아이디가 이미 존재해요"));
        dispatch(modalIsShown(true));
      }
    } else if (data.contentStatus === "004") {
      {
        dispatch(changeContentText("가입을 완료했어요"));
        dispatch(modalIsShown(true));
      }
    }
  }
  async function submitHandler(e) {
    e.preventDefault();
    const enteredId = idRef.current.value;
    const enteredPw = pwRef.current.value;
    if (isLogin) {
      //로그인을 하는 경우이다.
      const result = await signIn("credentials", {
        redirect: false,
        userId: enteredId,
        userPw: enteredPw,
      }).catch((e) => console.error(e));
      console.log(result);
      if (result.error) {
        console.error(result.error);
        dispatch(modalIsShown(true));
        dispatch(changeContentText("아이디나 비밀번호를 다시 확인해주세요"));
      }
      //로그인에 성공하는 경우이다.
      else if (result.error === null) {
        router.replace("/privatediaryCategory");
      }
    } else {
      //회원가입을 하는 경우이다.
      const result = await createUser(enteredId, enteredPw).catch((e) => {
        console.error(e);
        dispatch(modalIsShown(true));
        dispatch(changeContentText("오류가 발생했어요. 다시 시도해주세요"));
      });
    }
  }
  return (
    <>
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
      {/* {modal && <ModalContainer></ModalContainer>} */}
    </>
  );
};

const SignUp = () => {
  return <Account main={<SignUpContent></SignUpContent>}></Account>;
};
export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/privatediaryCategory",
      },
    };
  }
  return { props: { session } };
};
export default SignUp;
