import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "@/config.js";

export const routing = defineRouting({
  locales,
  defaultLocale,
});

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
