import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import { Content } from './Content';

export default function Page() {
  const locale = useLocale();
  const messages = useMessages();
  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
    >
      <div className="m-auto bg-[#032068] py-[10px] h-[100vh] flex flex-col">
        <Content />
      </div>
    </NextIntlClientProvider>
  );
}
