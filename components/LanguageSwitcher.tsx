"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  currentLang: "it" | "ro";
  isMobile?: boolean;
}

export default function LanguageSwitcher({
  currentLang,
  isMobile = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Extrage calea fără prefixul de limbă
  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  const languages = [
    {
      code: "ro" as const,
      name: "Română",
      flag: "🇷🇴",
    },
    {
      code: "it" as const,
      name: "Italiana",
      flag: "🇮🇹",
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === currentLang);
  const otherLanguage = languages.find((lang) => lang.code !== currentLang);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center gap-2 py-2">
        <span className="text-white text-lg">{currentLanguage?.flag}</span>
        <span className="text-gray-400">|</span>
        <Link
          href={`/${otherLanguage?.code}${pathWithoutLang}`}
          className="text-white hover:text-[#D2A55D] transition-colors text-lg"
        >
          {otherLanguage?.flag}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-white text-xl" title={currentLanguage?.name}>
        {currentLanguage?.flag}
      </span>
      <Link
        href={`/${otherLanguage?.code}${pathWithoutLang}`}
        className="text-white hover:text-[#D2A55D] transition-colors text-xl opacity-60 hover:opacity-100"
        title={`Schimbă în ${otherLanguage?.name}`}
      >
        {otherLanguage?.flag}
      </Link>
    </div>
  );
}
