import "../styles/globals.scss";
// import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { store, wrapper } from "../store/store";
import { Provider } from "react-redux";
import CheckAuth from "./components/checkAuth";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <CheckAuth>
        {/* <Provider store={store}> */}
        <Component {...pageProps} />
        {/* </Provider> */}
      </CheckAuth>
    </SessionProvider>
  );
}
// export default MyApp;

export default wrapper.withRedux(MyApp);

// import "../styles/globals.scss";
// import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;
