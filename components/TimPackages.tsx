"use client";

import { useState } from "react";
import stripePromise from '../lib/stripe';

interface TimPackage {
  id: string;
  name: string;
  icon: string;
  price: number;
  timAmount: number;
  bonusAmount?: number;
  description: string;
  popular?: boolean;
}

interface TimPackagesProps {
  title: string;
  subtitle: string;
  packages: TimPackage[];
  dict?: any;
  currentLang?: 'ro' | 'it';
}

export default function TimPackages({
  title,
  subtitle,
  packages,
  dict,
  currentLang = 'ro',
}: TimPackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    try {
      setSelectedPackage(packageId);

      // Creează checkout session cu Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          packageId,
          lang: currentLang 
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect direct la Stripe Checkout URL
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Eroare la crearea sesiunii de plată');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      setSelectedPackage(null);
    }
  };

  const getPackageIcon = (iconType: string) => {
    switch (iconType) {
      case "iron":
        return (
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {/* Wings */}
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-gradient-to-r from-orange-300 to-orange-500 rounded-l-full opacity-80"></div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-gradient-to-l from-orange-300 to-orange-500 rounded-r-full opacity-80"></div>
          </div>
        );
      case "silver":
        return (
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            {/* Wings */}
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-gradient-to-r from-gray-200 to-gray-400 rounded-l-full opacity-80"></div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-gradient-to-l from-gray-200 to-gray-400 rounded-r-full opacity-80"></div>
          </div>
        );
      case "gold":
        return (
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-6 h-6 text-white absolute" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            {/* Wings */}
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-l-full opacity-80"></div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-gradient-to-l from-yellow-300 to-yellow-500 rounded-r-full opacity-80"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[#D2A55D] text-sm font-semibold tracking-wider uppercase mb-4">
            {dict?.subtitle || "ALEGE PACHETUL CARE ÎȚI SE POTRIVEȘTE"}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative bg-gradient-to-br from-gray-900 to-black border rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  pkg.popular 
                    ? 'border-[#D2A55D] shadow-lg shadow-[#D2A55D]/20' 
                    : 'border-gray-700 hover:border-[#D2A55D]/50'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#D2A55D] text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {dict?.popularBadge || "POPULAR"}
                    </div>
                  </div>
                )}

                {/* Package Name */}
                <h3 className="text-white text-xl font-bold mb-6">{pkg.name}</h3>

                {/* Icon */}
                <div className="flex justify-center mb-8">
                  {getPackageIcon(pkg.icon)}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-white mb-2">
                    {pkg.price} €
                  </div>
                  <div className="text-[#D2A55D] font-semibold">
                    {pkg.timAmount} TIM
                    {pkg.bonusAmount && (
                      <span className="text-green-400"> + Bonus {pkg.bonusAmount} TIM</span>
                    )}
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={selectedPackage === pkg.id}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 mb-6 ${
                    selectedPackage === pkg.id
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-[#D2A55D] text-black hover:bg-[#E6B96A] shadow-lg'
                  }`}
                >
                  {selectedPackage === pkg.id 
                    ? (dict?.processingButton || 'Se procesează...') 
                    : (dict?.buyButton || 'Cumpără acum')
                  }
                </button>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="max-w-4xl mx-auto text-center mt-12">
          <p className="text-gray-500 text-sm">
            {dict?.footerNote || "Prețurile pachetelor nu includ TVA. Discount-ul Temporo nu se cumulează cu alte reduceri sau promoții, cu excepția cazului în care vibrațiile decide altfel."}
          </p>
        </div>
      </div>
    </section>
  );
}