import TranslatedContent from "@components/translatedContent";

export default async function Page({ params: { lng } }) {
  return <TranslatedContent lng={lng} />;
}
