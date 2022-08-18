import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { store, wrapper } from "../store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import CheckAuth from "./components/checkAuth";
import { modalIsShown } from "../store/features/modalSlice";
import ModalContainer from "../components/ModalContainer";
import { useEffect } from "react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const dispatch = useDispatch();
  const isShown = useSelector((state) => state.modal.isShown);
  // useEffect(() => {
  //   dispatch(modalIsShown(true));
  // }, []);
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <CheckAuth>
        {/* <Provider store={store}> */}
        <Component {...pageProps} />
        {/* {isShown && <ModalContainer></ModalContainer>} */}
        {/* </Provider> */}
      </CheckAuth>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
