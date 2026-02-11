import Image from "next/image";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function HeroSection({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section className="py-10 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
            {subtitle}
          </p>

          <p className="text-base lg:text-lg text-[#D2A55D] font-medium">
            {description}
          </p>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="aspect-square lg:aspect-[4/3] relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
