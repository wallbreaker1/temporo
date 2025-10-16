import { getDictionary } from '../dictionaries';

interface SuccessPageProps {
  params: Promise<{
    lang: 'ro' | 'it';
  }>;
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'success');
  
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            {dict.title}
          </h1>
          <p className="text-gray-300 mb-8">
            {dict.subtitle}
          </p>
          <div className="space-y-4">
            <a
              href={`/${lang}`}
              className="block w-full bg-[#D2A55D] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#E6B96A] transition-colors"
            >
              {dict.backToHome}
            </a>
            <a
              href={`/${lang}/shop`}
              className="block w-full bg-transparent border-2 border-[#D2A55D] text-[#D2A55D] py-3 px-6 rounded-lg font-semibold hover:bg-[#D2A55D] hover:text-black transition-colors"
            >
              {dict.backToShop}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}