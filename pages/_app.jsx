import "../styles/globals.scss";
// import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { store } from "../store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(showModal);
  }, [showModal]);
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Provider store={store}>
        <Component
          {...pageProps}
          showModal={showModal}
          setShowModal={setShowModal}
        />
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
