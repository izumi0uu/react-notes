import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { locales, defaultLocale } from "@/config.js";

// export default createMiddleware({
//   locales,
//   defaultLocale,
//   localeDetection: true,
//   localePrefix: "always",
// });

const initMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: "always",
});

export const config = {
  matcher: [
    "/",
    "/(zh|en)/:path*",
    "/client",
    "/note/:path*",
    "/note/edit/:path*",
    "/((?!api|_next|_vercel|.*\\.|favicon.ico).*)",
  ],
};

export async function middleware(request) {
  const authResult = await auth(request);
  console.log("authResult", authResult);
  if (authResult instanceof Response) return authResult;

  return initMiddleware(request);
}
