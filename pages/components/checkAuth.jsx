import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Intro from "../index";
import loading from "../../styles/components/isUploading.module.scss";
import { useEffect, useState } from "react";
const CheckAuth = ({ children }) => {
  const [heightSize, setHeightSize] = useState(0);
  // 모바일 화면도 대응하기 위해서, 동적으로 innerHeight를 가져온다.
  // 100vh로 설정하면 모바일 브라우저의 주소창 때문에 오류가 생기기 때문이다.
  useEffect(() => {
    const handleResize = () => {
      setHeightSize(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    const root = document.documentElement;
    root.style.setProperty("--responsive-full-height", `${heightSize}px`);
  }, [heightSize]);
  const { data: session, status } = useSession();
  const router = useRouter();
  if (router.asPath.includes("signup") && status === "unauthenticated") {
    return [children];
  }
  if (status === "loading") {
    return <p className={loading.loadingState}>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <Intro></Intro>;
  }
  return <>{children}</>;
};

export default CheckAuth;
