import Script from 'next/script';

export function AnalyticsScript({ enabled = false }: { enabled: boolean }) {
  return (
    enabled && (
      <>
        {/*Google tag (gtag.js)*/}
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-9H1MVCZHHR'></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9H1MVCZHHR');
  `,
          }}></Script>
      </>
    )
  );
}
