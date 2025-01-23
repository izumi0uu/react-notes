import { redirect } from "@/i18n/routing";
import { defaultLocale } from "@/config.js";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
