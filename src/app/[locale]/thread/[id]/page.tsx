import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import { Content } from './Content';
import { Metadata } from 'next';


export async function generateMetadata({ params }: any): Promise<Metadata> {  
  return {
    title: 'FluentPal replay',
    description: 'Listen to a playback of a conversation on FluentPal',
  };
}

export default function Page({ params: { slug } }: { params: { slug: string }}) {
  const locale = useLocale();
  const messages = useMessages();  
  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
    >
      <div className="m-auto bg-[#032068] py-[10px] h-[100dvh] flex flex-col">
        <Content />
      </div>
    </NextIntlClientProvider>
  );
}
