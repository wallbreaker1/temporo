"use client";

import { useState } from "react";
import stripePromise from "../lib/stripe";

interface TimPackage {
  id: string;
  name: string;
  icon: string;
  price: number;
  timAmount: number;
  bonusAmount?: number;
  description: string;
  popular?: boolean;
  benefitText?: string[];
  benefitTitle?: string;
}

interface TimPackagesProps {
  title: string;
  subtitle: string;
  packages: TimPackage[];
  dict?: any;
  currentLang?: "ro" | "it";
}

export default function TimPackages({
  title,
  subtitle,
  packages,
  dict,
  currentLang = "ro",
}: TimPackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    try {
      setSelectedPackage(packageId);

      // Creează checkout session cu Stripe
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId,
          lang: currentLang,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect direct la Stripe Checkout URL
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Eroare la crearea sesiunii de plată");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      setSelectedPackage(null);
    }
  };

  const getPackageIcon = (iconType: string) => {
    switch (iconType) {
      case "iron":
        return (
          <div className="w-full flex items-center justify-center mb-6">
            <img
              src="/bonze.png"
              alt="Bronze Package"
              className="w-44 h-auto object-contain"
            />
          </div>
        );
      case "silver":
        return (
          <div className="w-full flex items-center justify-center mb-6">
            <img
              src="/silver.png"
              alt="Silver Package"
              className="w-44 h-auto object-contain"
            />
          </div>
        );
      case "gold":
        return (
          <div className="w-full flex items-center justify-center mb-6">
            <img
              src="/gold.png"
              alt="Gold Package"
              className="w-44 h-auto object-contain"
            />
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
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col h-full bg-gradient-to-br from-gray-900 to-black border rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  pkg.popular
                    ? "border-[#D2A55D] shadow-lg shadow-[#D2A55D]/20"
                    : "border-gray-700 hover:border-[#D2A55D]/50"
                }`}
              >
                {/*
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative bg-gradient-to-br from-gray-900 to-black border rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  pkg.popular
                    ? "border-[#D2A55D] shadow-lg shadow-[#D2A55D]/20"
                    : "border-gray-700 hover:border-[#D2A55D]/50"
                }`}
              >*/}
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
                <h3 className="text-white text-xl font-bold mb-6">
                  {pkg.name}
                </h3>

                {/* Icon */}
                <div className="flex justify-center mb-8">
                  {getPackageIcon(pkg.icon)}
                </div>

                {/* Price */}
                {/*<div className="mb-6">
                  <div className="text-2xl font-bold text-white mb-2">
                    {pkg.price}
                  </div>
                  <div className="text-[#D2A55D] font-semibold">
                    {pkg.timAmount} TIM
                    {pkg.bonusAmount && (
                      <span className="text-green-400">
                        {" "}
                        + Bonus {pkg.bonusAmount} TIM
                      </span>
                    )}
                  </div>
                </div>*/}
                <div className="mb-6">
                  {/* Preț */}
                  <div className="text-2xl font-bold text-white mb-4">
                    {pkg.price}
                  </div>

                  {/* Beneficii */}
                  <div>
                    <div className="text-[#D2A55D] font-semibold mb-2">
                      {pkg.benefitTitle}
                    </div>

                    <ul className="mt-4 space-y-3 text-sm mx-auto w-fit text-left">
                      {pkg.benefitText?.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg
                            className="w-4 h-4 text-green-500 flex-shrink-0 mt-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 5.29a1 1 0 01.006 1.414l-7.25 7.3a1 1 0 01-1.42-.003L3.29 9.25a1 1 0 011.42-1.41l3.04 3.07 6.54-6.62a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <span className="text-gray-200 leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Purchase Button onClick={() => handlePurchase(pkg.id)}*/}

                {/* ACTIUNEA ON CLick mutata sus clasa cursor-not-allowed adaugata in className */}
                <button
                  disabled={selectedPackage === pkg.id}
                  className={`mt-auto cursor-not-allowed w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 mb-6 ${
                    selectedPackage === pkg.id
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-[#D2A55D] text-black hover:bg-[#E6B96A] shadow-lg"
                  }`}
                >
                  {selectedPackage === pkg.id
                    ? dict?.processingButton || "Se procesează..."
                    : dict?.buyButton || "Cumpără acum"}
                </button>
                {/*
                <button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={selectedPackage === pkg.id}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 mb-6 ${
                    selectedPackage === pkg.id
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-[#D2A55D] text-black hover:bg-[#E6B96A] shadow-lg"
                  }`}
                >
                  {selectedPackage === pkg.id
                    ? dict?.processingButton || "Se procesează..."
                    : dict?.buyButton || "Cumpără acum"}
                </button>*/}

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
            {dict?.footerNote ||
              "Prețurile pachetelor nu includ TVA. Discount-ul Temporo nu se cumulează cu alte reduceri sau promoții, cu excepția cazului în care vibrațiile decide altfel."}
          </p>
        </div>
      </div>
    </section>
  );
}
