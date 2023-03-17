import Script from "next/script";
import { memo, useEffect } from "react";
const TRACKING_ID = "G-WB27FGH6QJ";
const GoogleAnalytics = () => {
  useEffect(() => {
    gtag("event", "page_view", {
      page_path: window.location.pathname,
      send_to: TRACKING_ID,
    });
  }, []);
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      ></Script>
      {/* 👇 gtag function definition. notice that we don't send page views at this point.  */}
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  );
};
export default memo(GoogleAnalytics);

