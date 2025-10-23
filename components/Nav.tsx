"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavProps {
  dict: any;
}

export default function Nav({ dict }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Extrage limba curentă din URL
  const currentLang = pathname.split("/")[1] as "it" | "ro";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsBurgerOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    handleResize(); // check on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBurger = () => {
    setIsBurgerOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-300 ease-linear border-b border-x rounded-b-xl border-[#d2a55d] ${
          isScrolled
            ? "bg-black/90 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        {!isBurgerOpen && (
          <div className="px-6 py-4 flex items-center justify-between gap-8">
            {isScrolled && isMobile ? (
              <Button variant="primary">
                <Link href={`/${currentLang}/shop`}>
                  {dict.buyTim || "Cumpără TIM"}
                </Link>
              </Button>
            ) : (
              <Link href={`/${currentLang}`} className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Temporo Logo"
                  width={224}
                  height={75}
                  priority
                  className="w-56 h-auto"
                  quality={100}
                />
              </Link>
            )}

            {!isMobile && (
              <ul className="flex gap-x-6 list-none m-0 p-0">
                <li>
                  <Link
                    href={`/${currentLang}/shop`}
                    className="text-white hover:text-[#D2A55D] transition-colors font-medium"
                  >
                    {dict?.shop || "Magazin Temporo"}
                  </Link>
                </li>
                <li>
                  <span
                    className="text-sm font-medium text-white/50 cursor-not-allowed"
                    title="Coming soon"
                  >
                    {dict?.nav?.partners || "Parteneri"}
                  </span>
                </li>
                <li>
                  <span
                    className="text-sm font-medium text-white/50 cursor-not-allowed"
                    title="Coming soon"
                  >
                    {dict?.nav?.news || "News"}
                  </span>
                </li>
              </ul>
            )}

            {!isMobile && (
              <div className="flex items-center gap-4">
                <Button variant="primary">
                  <Link href={`/${currentLang}/shop`}>
                    {dict.buyTim || "Cumpără TIM"}
                  </Link>
                </Button>
                <LanguageSwitcher currentLang={currentLang} />
              </div>
            )}

            {isMobile && (
              <div className="flex items-center gap-4">
                <LanguageSwitcher currentLang={currentLang} isMobile={true} />
                <button
                  className="text-white hover:text-[#D2A55D] transition-colors"
                  onClick={handleBurger}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <Sidebar
        isBurgerOpen={isBurgerOpen}
        handleBurger={handleBurger}
        dict={dict}
        currentLang={currentLang}
      />
    </>
  );
}
