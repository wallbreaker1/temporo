import { getDictionary } from "./dictionaries";
import HeroSection from "../../components/HeroSection";
import ColumnWithImage from "../../components/ColumnWithImage";
import WhyChooseTim from "../../components/WhyChooseTim";
import TimPointsInfo from "../../components/TimPointsInfo";
import HowItWorks from "../../components/HowItWorks";
import Calculator from "../../components/Calculator";
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

      <ColumnWithImage
        subtitle={dict.aboutSection.subtitle}
        title={dict.aboutSection.title}
        description={dict.aboutSection.description}
        contentBlocks={[
          { description: dict.aboutSection.timPoints.description },
          { description: dict.aboutSection.timControl.description },
          { description: dict.aboutSection.mission.description },
          { description: dict.aboutSection.mission.benefits, highlight: true },
        ]}
        imageSrc={dict.aboutSection.imageSrc || "/about-saturn.png"}
        imageAlt={dict.aboutSection.imageAlt || "Ecosistemul Temporo"}
        currentLang={lang as "it" | "ro"}
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

      <Calculator
        title={dict.calculator.title}
        subtitle={dict.calculator.subtitle}
        disclaimer={dict.calculator.disclaimer}
        currencyLabel={dict.calculator.currencyLabel}
        currencyOptionEur={dict.calculator.currencyOptionEur}
        currencyOptionRon={dict.calculator.currencyOptionRon}
        productPriceLabel={dict.calculator.productPriceLabel}
        productPricePlaceholder={dict.calculator.productPricePlaceholder}
        maxPercentLabel={dict.calculator.maxPercentLabel}
        maxPercentPlaceholder={dict.calculator.maxPercentPlaceholder}
        maxAmountLabel={dict.calculator.maxAmountLabel}
        maxAmountPlaceholder={dict.calculator.maxAmountPlaceholder}
        pointsUsedLabel={dict.calculator.pointsUsedLabel}
        amountToPayLabel={dict.calculator.amountToPayLabel}
        resetButton={dict.calculator.resetButton}
      />

      <FAQ title={dict.faq.title} faqs={dict.faq.faqs} />

      <ColumnWithImage
        title={dict.joinSection.title}
        description={dict.joinSection.description}
        imageSrc="/map.png"
        imageAlt="Temporo Global Network"
        cta={{
          text: dict.joinSection.cta,
          href: `/${lang}/contact`,
        }}
        currentLang={lang as "it" | "ro"}
      />
    </main>
  );
}
