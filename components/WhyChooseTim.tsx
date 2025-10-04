type WhyChooseTimProps = {
  title: string;
  subtitle: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export default function WhyChooseTim({
  title,
  subtitle,
  features,
}: WhyChooseTimProps) {
  return (
    <section className="py-16 lg:py-20 bg-black">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-[#D2A55D] text-sm lg:text-base font-medium uppercase tracking-wider">
          {subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center space-y-4 group hover:transform hover:scale-105 transition-all duration-300"
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                <span className="text-4xl lg:text-5xl text-[#D2A55D] group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg lg:text-xl font-bold text-white mb-4 uppercase tracking-wide">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm lg:text-base text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
