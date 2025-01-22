import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  pathnames: {
    "/": "/",
    "/pathnames": {
      en: "/pathnames",
      de: "/pfadnamen",
    },
  },
});

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
