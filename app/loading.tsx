export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D2A55D] mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}
