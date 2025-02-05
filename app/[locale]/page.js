import { getTranslations } from "next-intl/server";

export default async function Page({ params }) {
  const { locale } = await params;
  const t = await getTranslations("Basic");

  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
