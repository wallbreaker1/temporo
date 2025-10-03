import { getDictionary } from "./dictionaries";
import HeroSection from "../../components/HeroSection";

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
    <main>
      <HeroSection
        title={dict.heroSection.title}
        subtitle={dict.heroSection.subtitle}
        description={dict.heroSection.description}
        imageSrc={dict.heroSection.imageSrc || "/hero-globe.png"}
        imageAlt={dict.heroSection.imageAlt || "Temporo Global Network"}
      />
    </main>
  );
}
