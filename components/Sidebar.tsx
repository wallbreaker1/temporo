"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

interface SidebarProps {
  isBurgerOpen: boolean;
  handleBurger: () => void;
  dict: any;
  currentLang: "it" | "ro";
}

export default function Sidebar({
  isBurgerOpen,
  handleBurger,
  dict,
  currentLang,
}: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full overflow-hidden bg-black z-30 flex flex-col items-center transition-all duration-300 ${
        isBurgerOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <button
        className="absolute right-0 p-5 text-white hover:text-[#D2A55D] transition-colors"
        onClick={handleBurger}
        aria-label="Închide meniul"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
        </svg>
      </button>

      <ul className="pt-24 w-64 text-center list-none space-y-6">
        <li>
          <Link
            href={`/${currentLang}`}
            onClick={handleBurger}
            className="block text-white hover:text-[#D2A55D] text-2xl transition-colors"
          >
            {dict.home || "Acasă"}
          </Link>
        </li>
        <li>
          <Link
            href={`/${currentLang}/about`}
            onClick={handleBurger}
            className="block text-white hover:text-[#D2A55D] text-2xl transition-colors"
          >
            {dict.about || "Despre"}
          </Link>
        </li>
        <li>
          <Link
            href={`/${currentLang}/services`}
            onClick={handleBurger}
            className="block text-white hover:text-[#D2A55D] text-2xl transition-colors"
          >
            {dict.services || "Servicii"}
          </Link>
        </li>
        <li>
          <Link
            href={`/${currentLang}/contact`}
            onClick={handleBurger}
            className="block text-white hover:text-[#D2A55D] text-2xl transition-colors"
          >
            {dict.contact || "Contact"}
          </Link>
        </li>
      </ul>

      <div className="mt-8">
        <LanguageSwitcher currentLang={currentLang} isMobile={true} />
      </div>
    </div>
  );
}
