import "@/styles/globals.css";
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Layout from './layout';
import HandleRoute from "./HandleRoutes";

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
