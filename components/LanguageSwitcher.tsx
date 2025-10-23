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
      flag: (
        <svg
          className="w-5 h-4"
          viewBox="0 0 3 2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1" height="2" fill="#002B7F" />
          <rect x="1" width="1" height="2" fill="#FCD116" />
          <rect x="2" width="1" height="2" fill="#CE1126" />
        </svg>
      ),
    },
    {
      code: "it" as const,
      name: "Italiana",
      flag: (
        <svg
          className="w-5 h-4"
          viewBox="0 0 3 2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1" height="2" fill="#009246" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#CE2B37" />
        </svg>
      ),
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === currentLang);
  const otherLanguage = languages.find((lang) => lang.code !== currentLang);

  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        {languages.map((lang) => (
          <Link
            key={lang.code}
            href={`/${lang.code}${pathWithoutLang}`}
            className="flex items-center justify-center py-2 hover:text-[#D2A55D] transition-all duration-200"
            title={`Schimbă în ${lang.name}`}
          >
            <span
              className={`text-white transition-all duration-200 ${
                currentLang === lang.code
                  ? "text-xl scale-110"
                  : "text-lg opacity-70 hover:opacity-100"
              }`}
            >
              {lang.flag}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}${pathWithoutLang}`}
          className="flex items-center hover:text-[#D2A55D] transition-all duration-200 group"
          title={`Schimbă în ${lang.name}`}
        >
          <span
            className={`text-white transition-all duration-200 ${
              currentLang === lang.code
                ? "text-2xl scale-110"
                : "text-xl opacity-70 hover:opacity-100 group-hover:scale-105"
            }`}
          >
            {lang.flag}
          </span>
        </Link>
      ))}
    </div>
  );
}
