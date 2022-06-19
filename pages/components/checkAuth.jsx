import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Intro from "../index";
import loading from "../../styles/components/isUploading.module.scss";
const CheckAuth = ({ children }) => {
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
