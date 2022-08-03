import Head from "next/head";
import Scripts from "next/script";

import "../styles/global.css";

import Layout from "../components/Layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
