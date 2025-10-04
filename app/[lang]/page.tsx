import { getDictionary } from "./dictionaries";
import HeroSection from "../../components/HeroSection";
import AboutSection from "../../components/AboutSection";
import WhyChooseTim from "../../components/WhyChooseTim";
import TimPointsInfo from "../../components/TimPointsInfo";
import HowItWorks from "../../components/HowItWorks";
import FAQ from "../../components/FAQ";

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

      <AboutSection
        subtitle={dict.aboutSection.subtitle}
        title={dict.aboutSection.title}
        description={dict.aboutSection.description}
        timPoints={dict.aboutSection.timPoints}
        timControl={dict.aboutSection.timControl}
        mission={dict.aboutSection.mission}
        imageSrc={dict.aboutSection.imageSrc || "/about-wireframe.png"}
        imageAlt={dict.aboutSection.imageAlt || "Temporo Ecosystem"}
      />

      <WhyChooseTim
        title={dict.whyChooseTim.title}
        subtitle={dict.whyChooseTim.subtitle}
        features={dict.whyChooseTim.features}
      />

      <TimPointsInfo
        title={dict.timPointsInfo.title}
        whatArePoints={dict.timPointsInfo.whatArePoints}
        whatAreNotPoints={dict.timPointsInfo.whatAreNotPoints}
      />

      <HowItWorks
        title={dict.howItWorks.title}
        subtitle={dict.howItWorks.subtitle}
        description={dict.howItWorks.description}
        steps={dict.howItWorks.steps}
      />

      <FAQ title={dict.faq.title} faqs={dict.faq.faqs} />
    </main>
  );
}
