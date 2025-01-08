import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { locales, defaultLocale } from "@/config.js";

const getLocale = (request) => {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };

  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
};

const middleware = (request) => {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return Response.redirect(request.nextUrl);
};

const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export { middleware, config };
