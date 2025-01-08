This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Project Structure

```
react-notes/
├── app/                                    # Next.js App Router 目录
│   ├── components/                         # 页面级组件
│   │   ├── button/
│   │   ├── editButton/
│   │   ├── logo/
│   │   ├── note/
│   │   ├── noteEditor/
│   │   ├── notePreview/
│   │   ├── sidebar/
│   │   ├── sidebarNoteItemContent/
│   │   ├── sidebarNoteItemHeader/
│   │   ├── sidebarNoteList/
│   │   └── sidebarNoteListSkeleton/
│   ├── note/                              # 笔记相关页面
│   │   ├── [id]/                         # 动态路由：笔记详情
│   │   │   ├── page.jsx
│   │   │   └── loading.js
│   │   └── edit/                         # 编辑功能
│   │       ├── [id]/
│   │       └── page.js
│   ├── fonts/                             # 字体资源
│   ├── action.js                          # 服务器操作
│   ├── globals.css                        # 全局样式
│   ├── layout.js                          # 根布局
│   └── page.js                            # 首页
└── lib/                                   # 工具库
    └── redis.js                           # Redis 数据库操作
```

# i18n

react-i18next 是 i18next 的一个插件

i18next-resources-to-backend，因为将翻译内容定义在 JS 文件中并不方便，定义在多个 json 文件中更为合适，i18next-resources-to-backend 帮助我们读取 json 文件资源，生成字典。

i18next-browser-languageDetector，在浏览器端自动检测语言
