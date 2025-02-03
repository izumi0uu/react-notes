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
    "/note/:path*",
    "/client",
    "/((?!api|_next|_vercel|.*\\.|favicon.ico).*)",
  ],
};

export async function middleware(request) {
  if (request.nextUrl.pathname === "/client") {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || defaultLocale;
    return Response.redirect(new URL(`/${locale}/client`, request.url));
  }

  if (request.nextUrl.pathname.startsWith("/note")) {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || defaultLocale;
    return Response.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}`, request.url)
    );
  }

  const authResult = await auth(request);
  if (authResult instanceof Response) return authResult;

  return initMiddleware(request);
}
