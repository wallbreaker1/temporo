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
      <Link
        href={`/${otherLanguage?.code}${pathWithoutLang}`}
        className="flex items-center justify-center py-2 hover:text-[#D2A55D] transition-colors"
        title={`Schimbă în ${otherLanguage?.name}`}
      >
        <span className="text-white text-lg">{currentLanguage?.flag}</span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${otherLanguage?.code}${pathWithoutLang}`}
      className="flex items-center gap-1 hover:text-[#D2A55D] transition-colors group"
      title={`Schimbă în ${otherLanguage?.name}`}
    >
      <span className="text-white text-xl group-hover:scale-110 transition-transform">
        {currentLanguage?.flag}
      </span>
    </Link>
  );
}
