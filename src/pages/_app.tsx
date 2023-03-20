// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app'
import Script from "next/script";

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-WB27FGH6QJ`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WB27FGH6QJ', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}