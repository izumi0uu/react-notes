import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 实验性功能配置
  experimental: {
    // 缓存时间配置
    staleTimes: {
      dynamic: 30,
      static: 3600,
    },
  },
};

export default withNextIntl(nextConfig);
