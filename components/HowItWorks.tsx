"use client";

import { useState, useRef, useEffect } from "react";

interface HowItWorksProps {
  title: string;
  subtitle: string;
  description: string;
  steps: {
    index: string;
    title: string;
    description: string;
    button?: {
      text: string;
      onClick: () => void;
      variant?: "primary" | "secondary";
    };
    customButtons?: {
      text: string;
      onClick: () => void;
      variant?: "primary" | "secondary";
      svgPath?: string;
      href?: string;
    }[];
  }[];
}

export default function HowItWorks({
  title,
  subtitle,
  description,
  steps,
}: HowItWorksProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance pentru a triggera schimbarea slide-ului
  const minSwipeDistance = 50;

  // Check if mobile on client side și setează flag că suntem pe client
  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Mouse/Touch handlers pentru drag natural
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Determină dacă trebuie să schimbe slide-ul
    if (Math.abs(dragOffset) > minSwipeDistance) {
      if (dragOffset > 0 && currentSlide > 0) {
        prevSlide();
      } else if (dragOffset < 0 && currentSlide < steps.length - 1) {
        nextSlide();
      }
    }

    setDragOffset(0);
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleEnd();
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const onMouseUp = () => {
    handleEnd();
  };

  const onMouseLeave = () => {
    handleEnd();
  };

  // Click handler pentru carduri
  const onCardClick = (index: number) => {
    if (index !== currentSlide && !isDragging) {
      goToSlide(index);
    }
  };

  const getTransform = () => {
    const cardWidth = isMobile ? 280 : 380;
    const gap = isMobile ? 16 : 32;
    const containerPadding = isMobile ? 16 : 32;
    const totalCardWidth = cardWidth + 16;
    const baseOffset = currentSlide * (totalCardWidth + gap);
    const finalOffset = baseOffset - dragOffset; // Subtract dragOffset pentru mișcarea naturală

    return `translateX(calc(50% - ${finalOffset}px - ${
      totalCardWidth / 2
    }px + ${containerPadding}px))`;
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = getTransform();
    }
  }, [currentSlide, dragOffset, isMobile]);

  // Nu renderiza conținutul până când nu suntem pe client
  if (!isClient) {
    return (
      <section className="py-16 lg:py-20 bg-black overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#D2A55D] mb-6">
              {title}
            </h2>
            <p className="text-white text-lg lg:text-xl mb-6 leading-relaxed">
              {subtitle}
            </p>
          </div>
          <div className="max-w-6xl mx-auto mb-12">
            <hr className="border-[#D2A55D]/30" />
          </div>
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse bg-gray-800 h-96 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 lg:py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Intro Section - Full Width */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#D2A55D] mb-6">
            {title}
          </h2>
          <p className="text-white text-lg lg:text-xl mb-6 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Separator */}
        <div className="max-w-6xl mx-auto mb-12">
          <hr className="border-[#D2A55D]/30" />
        </div>

        {/* Slider Container */}
        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Buttons - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#D2A55D] hover:bg-[#E6B96A] text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
            disabled={currentSlide === 0}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#D2A55D] hover:bg-[#E6B96A] text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
            disabled={currentSlide === steps.length - 1}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Slider Track cu touch support */}
          <div
            className="overflow-visible px-4 md:px-8 select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={isDragging ? onMouseMove : undefined}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              ref={sliderRef}
              className={`flex items-center ${
                isDragging
                  ? ""
                  : "transition-transform duration-500 ease-in-out"
              }`}
              style={{ gap: isMobile ? "16px" : "32px" }}
            >
              {steps.map((step, index) => {
                const isActive = index === currentSlide;
                const cardWidth = isMobile ? 280 : 380;
                const cardHeight = isMobile ? 320 : 380;

                return (
                  <div
                    key={index}
                    className={`flex-shrink-0 transition-all duration-300 ${
                      isDragging ? "cursor-grabbing" : "cursor-pointer"
                    } ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-40 scale-90 hover:opacity-70 hover:scale-95"
                    }`}
                    style={{
                      width: `${cardWidth + 16}px`,
                      height: `${cardHeight + 16}px`,
                    }}
                    onClick={() => onCardClick(index)}
                  >
                    <div
                      className={`group w-full h-full p-4 md:p-8 border-l-4 border-[#D2A55D] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex flex-col justify-between ${
                        isActive && (step.button || step.customButtons)
                          ? ""
                          : "pointer-events-none"
                      }`}
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                      }}
                    >
                      <div>
                        <span className="text-4xl md:text-5xl font-bold text-[#D2A55D]/40 group-hover:text-[#D2A55D]/60 transition-colors duration-300 block mb-3 md:mb-4">
                          {step.index}
                        </span>
                        <h4 className="text-lg md:text-2xl font-bold text-[#D2A55D] mb-3 md:mb-4 group-hover:text-[#E6B96A] transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>

                      {/* Optional Button */}
                      {step.button && isActive && !isDragging && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            step.button!.onClick();
                          }}
                          className={`mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105 self-start pointer-events-auto ${
                            step.button.variant === "secondary"
                              ? "bg-transparent border-2 border-[#D2A55D] text-[#D2A55D] hover:bg-[#D2A55D] hover:text-black"
                              : "bg-[#D2A55D] text-black hover:bg-[#E6B96A] shadow-lg"
                          }`}
                        >
                          {step.button.text}
                        </button>
                      )}

                      {/* Custom Buttons */}
                      {step.customButtons && isActive && !isDragging && (
                        <div className="mt-4 md:mt-6 flex flex-wrap gap-3 pointer-events-auto relative z-10">
                          {step.customButtons.map((customButton, btnIndex) =>
                            customButton.href ? (
                              <a
                                key={btnIndex}
                                href={customButton.href}
                                target={
                                  customButton.href.startsWith("http")
                                    ? "_blank"
                                    : "_self"
                                }
                                rel={
                                  customButton.href.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="inline-block transition-all duration-300 hover:scale-105 pointer-events-auto"
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                              >
                                {customButton.svgPath ? (
                                  <img
                                    src={customButton.svgPath}
                                    alt={customButton.text}
                                    className="h-8 md:h-10 w-auto object-contain"
                                  />
                                ) : (
                                  <span
                                    className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 inline-block ${
                                      customButton.variant === "secondary"
                                        ? "bg-transparent border-2 border-[#D2A55D] text-[#D2A55D] hover:bg-[#D2A55D] hover:text-black"
                                        : "bg-[#D2A55D] text-black hover:bg-[#E6B96A] shadow-lg"
                                    }`}
                                  >
                                    {customButton.text}
                                  </span>
                                )}
                              </a>
                            ) : (
                              <button
                                key={btnIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  customButton.onClick();
                                }}
                                className="transition-all duration-300 hover:scale-105 self-start pointer-events-auto"
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                              >
                                {customButton.svgPath ? (
                                  <img
                                    src={customButton.svgPath}
                                    alt={customButton.text}
                                    className="h-8 md:h-10 w-auto object-contain"
                                  />
                                ) : (
                                  <span
                                    className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 inline-block ${
                                      customButton.variant === "secondary"
                                        ? "bg-transparent border-2 border-[#D2A55D] text-[#D2A55D] hover:bg-[#D2A55D] hover:text-black"
                                        : "bg-[#D2A55D] text-black hover:bg-[#E6B96A] shadow-lg"
                                    }`}
                                  >
                                    {customButton.text}
                                  </span>
                                )}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#D2A55D] scale-125"
                    : "bg-[#D2A55D]/40 hover:bg-[#D2A55D]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
