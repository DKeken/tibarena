import { getTranslations } from "next-intl/server";
import { ProtectedData } from "../_components/protected-data";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="size-full flex flex-col items-center justify-center">
      <ProtectedData />

      <h1>{t("title")}</h1>
    </main>
  );
}
