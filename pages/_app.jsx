import "../styles/globals.scss";
// import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { store } from "../store/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

// import "../styles/globals.scss";
// import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;
