import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";
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

  // 严格检查 location 是否存在
  const location = authResult?.headers?.get("location");
  if (!location) return null;

  try {
    let redirectUrl;
    // 检查是否是完整的 URL
    if (location.startsWith("http")) {
      redirectUrl = new URL(location);
    } else {
      // 如果是相对路径，使用当前域名构建完整 URL
      redirectUrl = new URL(location, request.url);
    }

    // 获取当前语言
    const currentLocale = request.nextUrl.pathname.split("/")[1];

    // 只在确认是支持的语言时添加语言前缀
    if (locales.includes(currentLocale)) {
      // 确保路径以 / 开头
      const path = redirectUrl.pathname.startsWith("/")
        ? redirectUrl.pathname
        : `/${redirectUrl.pathname}`;
      redirectUrl.pathname = `/${currentLocale}${path}`;
    }

    console.log("Redirecting to:", redirectUrl.toString()); // 调试日志
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Auth redirect error:", error);
    console.error("Location value:", location); // 调试日志
    return null;
  }
}

export async function middleware(request) {
  // 1. 应用国际化中间件
  const intlResponse = intlMiddleware(request);

  // 2. 如果是语言重定向，直接返回
  if (intlResponse?.headers?.get("location")) {
    return intlResponse;
  }

  // 3. 处理认证，保持语言设置
  const authResponse = await handleAuth(request);
  if (authResponse) {
    return authResponse;
  }

  return intlResponse;
}
