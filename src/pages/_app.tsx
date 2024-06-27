import "@/styles/globals.css";
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Layout from './layout';
import HandleRoute from "./handleRoutes";

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <Layout>
        <HandleRoute />
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </>
  );
}

export default MyApp;
