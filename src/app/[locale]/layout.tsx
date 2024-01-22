import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import { Montserrat, Raleway } from 'next/font/google';
import cls from 'classnames';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const locales = ['en', 'vi'];

const montserrat = Montserrat({
  subsets: ['vietnamese'],
  variable: '--font-montserrat',
});
const raleway = Raleway({
  subsets: ['vietnamese'],
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'FluentPal - Revolutionize your language learning with AI',
  description: `FluentPal: Revolutionize Your English with AI - FluentPal offers an innovative AI-driven platform designed to enhance your English speaking and communication skills. With just 30 minutes of daily practice, you can immerse yourself in a virtual environment tailored for effective language learning. Whether you're a beginner or looking to polish your fluency, FluentPal adapts to your level, providing personalized feedback and engaging interactive exercises. Experience a convenient and dynamic way to master English, anytime, anywhere with FluentPal.`,
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }: Props) {  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <Head>
        <title>FluentPal - Language Learning with AI</title>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=608504484568454&ev=PageView&noscript=1"
          />
        </noscript>
        <link
          rel="icon"
          href="favicon.png"
          type="image/png"
          sizes="32x32"
        />
        <meta
          name="description"
          content="FluentPal: Revolutionize Your English with AI - FluentPal offers an innovative AI-driven platform designed to enhance your English speaking and communication skills. With just 30 minutes of daily practice, you can immerse yourself in a virtual environment tailored for effective language learning. Whether you're a beginner or looking to polish your fluency, FluentPal adapts to your level, providing personalized feedback and engaging interactive exercises. Experience a convenient and dynamic way to master English, anytime, anywhere with FluentPal."
        />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0"
        />

        <meta
          name="keywords"
          content="english, chinese, speaking, education, korean, japanase, languagelearning, spanish, dutch, french"
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
