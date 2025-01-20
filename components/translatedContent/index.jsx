import { useTranslation } from "@app/i18n";

export default async function TranslatedContent({ lng }) {
  const { t } = await useTranslation(lng);
  console.log(t);
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state"> {t("initText")}</span>
    </div>
  );
}
