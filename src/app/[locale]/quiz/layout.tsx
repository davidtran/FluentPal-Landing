import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
    >
      {children}
    </NextIntlClientProvider>
  );
}
