"use client";

import { NextIntlClientProvider, useLocale } from "next-intl";

const IntlClientProvider = ({ messages, children }) => {
  const locale = useLocale();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlClientProvider;
