// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app'
import GoogleAnalytics from "@/components/GoogleAnalytics";

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <GoogleAnalytics />
      </Head>
      <Component {...pageProps} />
    </>
  );
}