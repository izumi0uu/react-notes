## Project Structure

```
react-notes/
├── app/                   # Next.js App Router directory
│   ├── [locale]/          # Internationalization routes
│   │   ├── layout.js      # Root layout
│   │   ├── page.js        # Home page
│   │   └── globals.css    # Global styles
│   │   └── page.module.css
│   │   └── actions.js     # Server actions
│   └── note/              # Note related pages
│       ├── [id]/          # Dynamic route: note detail
│       │   ├── page.jsx
│       │   └── loading.jsx
│       └── edit/          # Edit functionality
│            ├── [id]/
│            │   └── page.jsx
│            └── page.jsx
│            └── loading.jsx
│
├── components/            # Shared components
│   ├── button/
│   ├── editButton/
│   ├── logo/
│   ├── nextIntlClientProvider/
│   ├── note/
│   ├── noteEditor/
│   ├── notePreview/
│   ├── sidebar/
│   ├── sidebarNoteItemContent/
│   ├── sidebarNoteItemHeader/
│   ├── sidebarNoteList/
│   ├── sidebarNoteListFilter/
│   ├── sidebarNoteListSkeleton/
│   └── sidebarSearchField/
├── i18n/                  # Internationalization configuration
│   ├── request.js        # Request config for next-intl
│   └── routing.js        # Routing config for next-intl
├── lib/                   # Utility functions
│   └── redis.js          # Redis database operations
├── messages/             # Internationalization messages
│   ├── en.json          # English translations
│   └── zh.json          # Chinese translations
├── public/               # Static files
├── .env                  # Environment variables
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Git ignore rules
├── config.js            # Global configuration
├── middleware.js        # Next.js middleware
├── next.config.mjs      # Next.js configuration
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Getting Started

### start db

redis-server.exe redis.windows.conf

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

You can start editing the page by modifying `app/[locale]/page.js`. The page auto-updates as you edit the file.

## Features

- 📝 Real-time note editing
- 🌐 Internationalization support (English & Chinese)
- 🎨 Markdown support
- 🔍 Note search functionality
- 💾 Redis database integration
- ⚡ Server-side rendering
- 🎯 Client-side optimizations

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [Redis]s(https://redis.io/) - Database
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
