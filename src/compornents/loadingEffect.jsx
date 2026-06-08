export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Spinner */}
      <div className="relative">
        <div className="w-24 h-24 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">
          🍽️
        </div>
      </div>

      {/* Text */}
      <h2 className="mt-6 text-yellow-400 text-xl font-bold tracking-wider">
        Loading Menu...
      </h2>

      <p className="text-gray-400 text-sm mt-2">
        Preparing delicious items for you
      </p>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-yellow-400 animate-pulse w-full"></div>
      </div>
    </div>
  );
}