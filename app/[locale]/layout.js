import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import IntlClientProvider from "@/components/nextIntlClientProvider";
import { locales } from "@/config.js";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <IntlClientProvider locale={locale} messages={messages}>
          <div className="container">
            <Header />
            <div className="main">
              <Sidebar />
              <section className="col note-viewer">{children}</section>
            </div>
          </div>
        </IntlClientProvider>
      </body>
    </html>
  );
}
