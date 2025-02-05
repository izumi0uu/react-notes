import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { locales, defaultLocale } from "@/config.js";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\.|favicon.ico).*)"],
};

async function handleAuth(request) {
  const authResult = await auth(request);

  // 当不需要认证重定向时返回 null
  // 允许继续处理请求
  // 不会干扰语言路由的处理
  const location = authResult?.headers?.get("location");
  if (!location) return null;

  return NextResponse.redirect(location);
}

export async function middleware(request) {
  // 1. 应用国际化中间件
  const intlResponse = intlMiddleware(request);

  // 2. 如果是语言重定向，直接返回
  if (intlResponse?.headers?.get("location")) return intlResponse;

  // 3. 处理认证
  const authResponse = await handleAuth(request);
  if (authResponse) return authResponse;

  return intlResponse;
}
