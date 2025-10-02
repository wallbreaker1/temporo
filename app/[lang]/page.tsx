import { getDictionary } from "./dictionaries";
import Banner from "../../components/Banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "it" | "ro", "home");
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
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "it" | "ro", "home");

  return (
    <main className="py-8">
      <Banner title={dict.hero.title} description={dict.hero.description} />
    </main>
  );
}
