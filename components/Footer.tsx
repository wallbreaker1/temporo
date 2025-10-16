import Link from "next/link";
import Image from "next/image";

type FooterDict = {
  copyright: string;
  privacy: string;
  terms?: string;
  contact?: string;
  about?: string;
  services?: string;
  company?: string;
  legal?: string;
  home?: string;
  description: string;
};

export default function Footer({
  dict,
  currentLang = "ro",
}: {
  dict: FooterDict;
  currentLang?: "ro" | "it";
}) {
  return (
    <footer className="relative bg-black py-16 lg:py-20 overflow-hidden">
      {/* Background World Map */}
      <div className="absolute inset-0 opacity-20">
        <div className="relative w-full h-full">
          {/* Dotted World Map Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D2A55D]/10 to-transparent"></div>

          {/* Glowing Dots */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D2A55D] rounded-full animate-pulse shadow-lg shadow-[#D2A55D]/50"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-[#D2A55D] rounded-full animate-pulse shadow-lg shadow-[#D2A55D]/50"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#D2A55D] rounded-full animate-pulse shadow-lg shadow-[#D2A55D]/50"></div>

          {/* Additional smaller dots */}
          <div className="absolute top-1/5 left-3/5 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2/5 right-1/5 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/5 left-1/5 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href={`/${currentLang}`} className="block">
              <Image
                src="/logo.png"
                alt="Temporo Logo"
                width={160}
                height={54}
                className="w-56"
              />
            </Link>
            <p className="text-gray-400 text-base leading-relaxed max-w-md">
              {dict.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-[#D2A55D] text-lg font-bold">
              {dict.company || "Companie"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${currentLang}`}
                  className="text-gray-400 hover:text-[#D2A55D] transition-colors"
                >
                  {dict.home || "Home"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLang}/about`}
                  className="text-gray-400 hover:text-[#D2A55D] transition-colors"
                >
                  {dict.about || "Despre"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLang}/services`}
                  className="text-gray-400 hover:text-[#D2A55D] transition-colors"
                >
                  {dict.services || "Servicii"}
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  {dict?.contact || "Contact"} (Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h3 className="text-[#D2A55D] text-lg font-bold">
              {dict.legal || "Legal"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-[#D2A55D] transition-colors"
                >
                  {dict.privacy}
                </Link>
              </li>
              {dict.terms && (
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-[#D2A55D] transition-colors"
                  >
                    {dict.terms}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">{dict.copyright}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Powered by</span>
              <span className="text-[#D2A55D] font-medium">MultiversX</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
