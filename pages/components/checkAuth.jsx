import { useDispatch, useSelector } from "react-redux";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignUp from "../settings/signup";
import Intro from "../index";
const CheckAuth = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (router.asPath.includes("signup") && status === "unauthenticated") {
    return [children];
  }
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <Intro></Intro>;
  }
  return <>{children}</>;
};

export default CheckAuth;
