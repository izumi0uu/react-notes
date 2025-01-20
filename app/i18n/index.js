import { locales, defaultLocale } from "@/config";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

const initI18next = async (lng = defaultLocale, ns = "basic") => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    // import translation file
    .use(
      resourcesToBackend((language, namespace) =>
        import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init({
      // debug: true,
      supportedLngs: locales, // 支持的语言列表
      fallbackLng: defaultLocale, // 默认语言
      lng, // 当前语言
      fallbackNS: "basic", // 默认命名空间
      defaultNS: "basic", // 默认命名空间
      ns, // 当前命名空间
    });
  return i18nInstance;
};

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
