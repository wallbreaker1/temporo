"use client";

import { useState, useEffect } from "react";

interface CalculatorProps {
  title: string;
  subtitle: string;
  disclaimer: string;
  currencyLabel: string;
  currencyOptionEur: string;
  currencyOptionRon: string;
  productPriceLabel: string;
  productPricePlaceholder: string;
  maxPercentLabel: string;
  maxPercentPlaceholder: string;
  maxAmountLabel: string;
  maxAmountPlaceholder: string;
  pointsUsedLabel: string;
  amountToPayLabel: string;
  resetButton: string;
}

export default function Calculator({
  title,
  subtitle,
  disclaimer,
  currencyLabel,
  currencyOptionEur,
  currencyOptionRon,
  productPriceLabel,
  productPricePlaceholder,
  maxPercentLabel,
  maxPercentPlaceholder,
  maxAmountLabel,
  maxAmountPlaceholder,
  pointsUsedLabel,
  amountToPayLabel,
  resetButton,
}: CalculatorProps) {
  const [currency, setCurrency] = useState<"EUR" | "RON">("EUR");
  const [productPrice, setProductPrice] = useState<string>("");
  const [maxPercent, setMaxPercent] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [locked, setLocked] = useState<"percent" | "amount" | "">("");
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [amountToPay, setAmountToPay] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleCurrencySelect = (selectedCurrency: "EUR" | "RON") => {
    setCurrency(selectedCurrency);
    setDropdownOpen(false);
  };

  const handlePercentChange = (value: string) => {
    setMaxPercent(value);
    if (value !== "") {
      setMaxAmount("");
      setLocked("percent");
    } else {
      setLocked("");
    }
  };

  const handleAmountChange = (value: string) => {
    setMaxAmount(value);
    if (value !== "") {
      setMaxPercent("");
      setLocked("amount");
    } else {
      setLocked("");
    }
  };

  const updateCalculator = () => {
    const price = parseFloat(productPrice) || 0;
    const limitPercent = parseFloat(maxPercent) || 100;
    const limitAmount = parseFloat(maxAmount) || 0;

    const timValue = currency === "RON" ? 5 : 1;

    let discountValue = price;
    if (locked === "percent" && limitPercent < 100) {
      discountValue = (limitPercent / 100) * price;
    }
    if (locked === "amount" && limitAmount > 0 && limitAmount < discountValue) {
      discountValue = limitAmount;
    }

    const requiredPoints = discountValue / timValue;
    const fiatAmount = price - discountValue;

    setPointsUsed(Math.ceil(requiredPoints)); // Rotunjire în sus pentru punctele necesare
    setAmountToPay(fiatAmount);
  };

  const resetCalculator = () => {
    setProductPrice("");
    setMaxPercent("");
    setMaxAmount("");
    setLocked("");
    setPointsUsed(0);
    setAmountToPay(0);
  };

  useEffect(() => {
    updateCalculator();
  }, [currency, productPrice, maxPercent, maxAmount, locked]);

  return (
    <section className="py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#D2A55D] mb-4">
            {title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="group p-8 border-2 border-[#D2A55D] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl transition-all duration-300">
            {/* Currency Selection */}
            <div className="mb-6">
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {currencyLabel}
              </label>

              {/* Custom Dropdown */}
              <div className="relative">
                {/* Dropdown Button */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full px-4 py-2 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D2A55D] focus:border-transparent flex items-center justify-between"
                >
                  <span>
                    {currency === "EUR" ? currencyOptionEur : currencyOptionRon}
                  </span>
                  <div
                    className={`transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Options */}
                <div
                  className={`mt-2 transition-all duration-300 ease-in-out overflow-hidden ${
                    dropdownOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-gray-800/90 border border-gray-600/50 rounded-lg shadow-lg">
                    <button
                      type="button"
                      onClick={() => handleCurrencySelect("EUR")}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-colors duration-200 first:rounded-t-lg ${
                        currency === "EUR"
                          ? "bg-[#D2A55D]/20 text-[#D2A55D]"
                          : "text-white"
                      }`}
                    >
                      {currencyOptionEur}
                    </button>
                    <div className="border-t border-gray-600/30"></div>
                    <button
                      type="button"
                      onClick={() => handleCurrencySelect("RON")}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-colors duration-200 last:rounded-b-lg ${
                        currency === "RON"
                          ? "bg-[#D2A55D]/20 text-[#D2A55D]"
                          : "text-white"
                      }`}
                    >
                      {currencyOptionRon}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Price */}
            <div className="mb-6">
              <label
                htmlFor="productPrice"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {productPriceLabel}
              </label>
              <input
                type="number"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder={productPricePlaceholder}
                className="w-full px-4 py-2 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D2A55D] focus:border-transparent"
              />
            </div>

            {/* Max Percent */}
            <div className="mb-6">
              <label
                htmlFor="maxPercent"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {maxPercentLabel}
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="maxPercent"
                  value={maxPercent}
                  onChange={(e) => handlePercentChange(e.target.value)}
                  placeholder={maxPercentPlaceholder}
                  min="0"
                  max="100"
                  disabled={locked === "amount"}
                  className="w-full px-4 py-2 pr-8 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D2A55D] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="absolute right-3 top-2 text-gray-400">%</span>
              </div>
            </div>

            {/* Max Amount */}
            <div className="mb-6">
              <label
                htmlFor="maxAmount"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {maxAmountLabel}
              </label>
              <input
                type="number"
                id="maxAmount"
                value={maxAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder={maxAmountPlaceholder}
                min="0"
                disabled={locked === "percent"}
                className="w-full px-4 py-2 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D2A55D] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Divider */}
            <hr className="border-[#D2A55D]/30 my-6" />

            {/* Results */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  {pointsUsedLabel}
                </span>
                <span className="text-[#D2A55D] font-bold group-hover:text-[#E6B96A] transition-colors duration-300">
                  {pointsUsed.toFixed(2)} TIM
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  {amountToPayLabel}
                </span>
                <span className="text-[#D2A55D] font-bold group-hover:text-[#E6B96A] transition-colors duration-300">
                  {amountToPay.toFixed(2)} {currency === "RON" ? "RON" : "€"}
                </span>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetCalculator}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {resetButton}
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
            <p className="text-sm text-yellow-200 flex items-start gap-2">
              <span className="text-yellow-400 flex-shrink-0">⚠️</span>
              {disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
