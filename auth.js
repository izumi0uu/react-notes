import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { NextResponse } from "next/server";

function getLocaleFromPath(pathname) {
  const match = pathname.match(/^\/(zh|en)\//);
  return match ? match[1] : "en";
}

// 导出 NextAuth 的核心功能
export const {
  handlers, // API 路由处理器
  auth, // 认证函数
  signIn, // 登录函数
  signOut, // 登出函数
} = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      httpOptions: {
        timeout: 5000,
      },
    }),
  ],
  debug: true,
  callbacks: {
    authorized({ request, auth }) {
      const pathname = request.nextUrl.pathname;
      const locale = getLocaleFromPath(pathname);

      if (
        pathname.startsWith(`/${locale}/note/edit`) ||
        pathname.startsWith(`/note/edit`)
      )
        // If the request is from an authenticated user, `auth()` will return a Session object
        // If the request is from an unauthenticated user, `auth()` will redirect to the sign-in page
        // Middleware will accept the response and handle the redirect
        return !!auth;

      return true;
    },
  },
});
