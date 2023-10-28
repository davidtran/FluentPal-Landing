import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import { Montserrat, Raleway } from 'next/font/google';
import cls from 'classnames';

const montserrat = Montserrat({
  subsets: ['vietnamese'],
  variable: '--font-montserrat',
});
const raleway = Raleway({ subsets: ['vietnamese'], variable: '--font-raleway' });

export const metadata: Metadata = {
  title: 'FluentPal - Giao tiếp tiếng Anh thành thạo sau 3 tháng với gia sư AI',
  description:
    'Ứng dụng AI tạo môi trường thực hành nói và giao tiếp tiếng Anh thành thạo chỉ cần 30 phút mỗi ngày',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>
          FluentPal - Giao tiếp tiếng Anh thành thạo sau 3 tháng với gia sư AI
        </title>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=608504484568454&ev=PageView&noscript=1"
          />
        </noscript>
        <meta
          name="keywords"
          content="Ứng dụng AI tạo môi trường thực hành nói và giao tiếp tiếng Anh thành thạo chỉ cần 30 phút mỗi ngày"
        ></meta>
        <meta
          property="fb:page_id"
          content="100092194243400"
        ></meta>
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Q6YQJ538P0"
      ></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></Script>
      <Script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-Q6YQJ538P0');
      `}</Script>
      <Script id="marketing">{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '608504484568454');
fbq('track', 'PageView');

<!-- End Meta Pixel Code -->
`}</Script>

      <body className={cls(montserrat.variable, raleway.variable)}>
        {children}
      </body>
    </html>
  );
}
