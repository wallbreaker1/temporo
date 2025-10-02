import { getDictionary } from "./dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "it" | "ro" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "home");
  return {
    title: dict.seo?.title || dict.hero.title,
    description: dict.seo?.description || dict.hero.description,
    openGraph: {
      images: [dict.seo?.image || "/logo1600.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "it" | "ro" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "home");

  return (
    <main>
      <h1>{dict.hero.title}</h1>
      <p>{dict.hero.description}</p>
    </main>
  );
}
