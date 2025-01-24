import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

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
    }),
  ], // 使用 GitHub 作为认证提供者
});
