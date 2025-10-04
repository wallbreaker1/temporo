interface HowItWorksProps {
  title: string;
  subtitle: string;
  description: string;
  steps: {
    index: string;
    title: string;
    description: string;
  }[];
}

export default function HowItWorks({
  title,
  subtitle,
  description,
  steps,
}: HowItWorksProps) {
  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Intro Section - Full Width */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#D2A55D] mb-6">
            {title}
          </h2>
          <p className="text-white text-lg lg:text-xl mb-6 leading-relaxed">
            {subtitle}
          </p>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Separator */}
        <div className="max-w-6xl mx-auto mb-12">
          <hr className="border-[#D2A55D]/30" />
        </div>

        {/* Secțiunea cu Pașii */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Intro Card */}
            <div className="bg-gradient-to-br from-[#D2A55D] to-[#B8944F] p-8 text-black rounded-2xl shadow-2xl lg:col-span-1 flex items-center justify-center min-h-[200px]">
              <h3 className="text-xl lg:text-2xl font-bold leading-tight text-center">
                Oferim un proces structurat pentru ecosistemul de fidelizare 2.0
              </h3>
            </div>

            {/* Steps */}
            {steps.map((step, index) => (
              <div
                key={index}
                className="group p-8 border-l-4 border-[#D2A55D] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 lg:col-span-1"
              >
                <span className="text-4xl lg:text-5xl font-bold text-[#D2A55D]/40 group-hover:text-[#D2A55D]/60 transition-colors duration-300">
                  {step.index}
                </span>
                <h4 className="text-xl lg:text-2xl font-bold text-[#D2A55D] mt-4 mb-3 group-hover:text-[#E6B96A] transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
