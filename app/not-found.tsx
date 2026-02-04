export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#D2A55D] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[#D2A55D] text-black font-semibold rounded-lg hover:bg-[#E6B96A] transition-colors duration-300"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
