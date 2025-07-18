import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import Download from "./Download";

export default function Page({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const messages = useMessages();
  console.log(messages);

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
    >
      <div className="w-full min-h-[100vh] flex justify-center items-center">
        <Download />
      </div>
    </NextIntlClientProvider>
  );
}
