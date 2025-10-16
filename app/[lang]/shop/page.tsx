import TimPackages from '../../../components/TimPackages';
import { getDictionary } from '../dictionaries';

interface ShopPageProps {
  params: Promise<{
    lang: 'ro' | 'it';
  }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'shop');

  const timPackages = [
    {
      id: 'iron',
      name: dict.packages.iron.name,
      icon: 'iron',
      price: 10,
      timAmount: 30,
      description: dict.packages.iron.description,
    },
    {
      id: 'silver',
      name: dict.packages.silver.name,
      icon: 'silver',
      price: 50,
      timAmount: 150,
      bonusAmount: 50,
      description: dict.packages.silver.description,
      popular: true,
    },
    {
      id: 'gold',
      name: dict.packages.gold.name,
      icon: 'gold',
      price: 250,
      timAmount: 750,
      bonusAmount: 100,
      description: dict.packages.gold.description,
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