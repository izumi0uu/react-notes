import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/config.js";

// export default createMiddleware({
//   locales,
//   defaultLocale,
//   localeDetection: true,
//   localePrefix: "always",
// });

export const config = {
  matcher: [
    "/",
    "/(zh|en)/:path*",
    "/note/:path*",
    "/((?!api|_next|_vercel|.*\\.).)*",
  ],
};

export function middleware(request) {
  // 打印请求头信息
  console.log("Accept-Language:", request.headers.get("accept-language"));
  console.log("Cookie:", request.headers.get("cookie"));

  // 打印当前 URL 信息
  console.log("Current pathname:", request.nextUrl.pathname);
  console.log("Locale detection enabled:", true);
  console.log("Default locale:", defaultLocale);
  console.log("Supported locales:", locales);

  return createMiddleware({
    locales,
    defaultLocale,
    localeDetection: true,
    localePrefix: "always",
  })(request);
}
