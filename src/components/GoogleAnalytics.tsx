import Script from "next/script";
import { memo, useEffect } from "react";
const GoogleAnalytics = () => {
  return (
    <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WB27FGH6QJ');
        `}
    </Script>
    </>
  );
};
export default memo(GoogleAnalytics);

