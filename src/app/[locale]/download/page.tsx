import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import Download from "./Download";

export default function Page() {
  const locale = useLocale();
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
    >
      <div className="w-full min-h-[100vh] flex justify-start items-center">
        <Download />
      </div>
    </NextIntlClientProvider>
  );
}
