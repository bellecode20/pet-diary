import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(showModal);
  }, [showModal]);
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component
        {...pageProps}
        showModal={showModal}
        setShowModal={setShowModal}
      />
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
