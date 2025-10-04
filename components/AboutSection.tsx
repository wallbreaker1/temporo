import Image from "next/image";

type AboutSectionProps = {
  subtitle: string;
  title: string;
  description: string;
  timPoints: {
    description: string;
  };
  timControl: {
    description: string;
  };
  mission: {
    description: string;
    benefits: string;
  };
  imageSrc: string;
  imageAlt: string;
};

export default function AboutSection({
  subtitle,
  title,
  description,
  timPoints,
  timControl,
  mission,
  imageSrc,
  imageAlt,
}: AboutSectionProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-[#D2A55D] text-sm lg:text-base font-medium uppercase tracking-wider">
              {subtitle}
            </p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>
          </div>

          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            {description}
          </p>

          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            {timPoints.description}
          </p>

          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            {timControl.description}
          </p>

          <div className="space-y-4">
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
              {mission.description}
            </p>
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed pl-4 border-l-2 border-[#D2A55D]">
              {mission.benefits}
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative lg:sticky lg:top-24">
          <div className="aspect-[4/3] relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
