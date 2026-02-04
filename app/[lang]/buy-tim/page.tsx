import TimPackages from "../../../components/TimPackages";
import { getDictionary } from "../dictionaries";

interface ShopPageProps {
  params: Promise<{
    lang: "ro" | "it";
  }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "shop");

  const timPackages = [
    {
      id: "iron",
      name: dict.packages.iron.name,
      icon: "iron",
      price: dict.packages.iron.price,
      timAmount: 30,
      description: dict.packages.iron.description,
      benefitTitle: dict.packages.iron.benefitTitle,
      benefitText: dict.packages.iron.benefitText,
    },
    {
      id: "silver",
      name: dict.packages.silver.name,
      icon: "silver",
      price: dict.packages.silver.price,
      timAmount: 150,
      bonusAmount: 50,
      description: dict.packages.silver.description,
      popular: true,
      benefitTitle: dict.packages.silver.benefitTitle,
      benefitText: dict.packages.silver.benefitText,
    },
    {
      id: "gold",
      name: dict.packages.gold.name,
      icon: "gold",
      price: dict.packages.gold.price,
      timAmount: 750,
      bonusAmount: 100,
      description: dict.packages.gold.description,
      benefitTitle: dict.packages.gold.benefitTitle,
      benefitText: dict.packages.gold.benefitText,
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <TimPackages
        title={dict.title}
        subtitle=""
        packages={timPackages}
        dict={dict}
        currentLang={lang}
      />
    </main>
  );
}
