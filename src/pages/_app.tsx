// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WB27FGH6QJ"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-WB27FGH6QJ');
        </script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}