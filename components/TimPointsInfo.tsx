type TimPointsInfoProps = {
  title: string;
  whatArePoints: {
    title: string;
    points: string[];
  };
  whatAreNotPoints: {
    title: string;
    points: string[];
  };
};

export default function TimPointsInfo({
  title,
  whatArePoints,
  whatAreNotPoints,
}: TimPointsInfoProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
          {title}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
        {/* What TIM Points ARE */}
        <div className="group p-8 lg:p-10 border-2 border-[#D2A55D] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex flex-col h-full">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#D2A55D] mb-8 text-center group-hover:text-[#E6B96A] transition-colors duration-300">
            {whatArePoints.title}
          </h3>

          <div className="space-y-6 flex-1">
            {whatArePoints.points.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-300 text-base lg:text-lg leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What TIM Points are NOT */}
        <div className="group p-8 lg:p-10 border-2 border-[#D2A55D] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex flex-col h-full">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#D2A55D] mb-8 text-center group-hover:text-[#E6B96A] transition-colors duration-300">
            {whatAreNotPoints.title}
          </h3>

          <div className="space-y-6 flex-1">
            {whatAreNotPoints.points.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-300 text-base lg:text-lg leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
