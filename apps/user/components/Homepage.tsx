import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Hero Section */}
      <section
        className={`bg-gradient-to-br from-green-100 border rounded-4xl border-blue-100 to-blue-300 flex flex-col items-center justify-center text-center min-h-screen px-6 mx-20 pt-20 relative overflow-hidden transition-all duration-500 ${hovered ? "shadow-xl" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute left-0 top-1/2 w-0 h-0 border-[100px] border-t-transparent border-b-transparent border-r-blue-300 opacity-30 animate-lightSpeed"></div>
            <div className="absolute top-0 right-0  w-90 h-90 bg-blue-300 rounded-full animate-spinSlow"></div>
            <div className="absolute bottom-0 left-0  w-90 h-90 bg-gradient-to-br from-blue-400 to-blue-100 rounded-full animate-spinSlow"></div>
            {/* <div className="absolute bottom-0 left-0 w-20 h-20 bg-green-300 rounded-full animate-bounce"></div> */}
            <div className="absolute  ml-60 top-10 w-220 h-240 border-4 border-blue-100 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-[url('/crypto-bg.jpg')] bg-cover bg-center opacity-50"></div>
            <div className="absolute inset-0 bg-[url('/crypto-bg.jpg')] bg-cover bg-center opacity-50"></div>
            <div className="absolute bottom-4 left-4 opacity-50">
              <Image src="/bitcoin.png" width={80} height={80} alt="Bitcoin" className="animate-bounce" />
            </div>
            <div className="absolute bottom-4 right-4 opacity-50">
              <Image src="/ruppe.png" width={80} height={80} alt="Rupee" className="animate-bounce" />
            </div>
            <div className="absolute top-4 left-4 opacity-50">
              <Image src="/dollar.png" width={80} height={80} alt="Dollar" className="animate-lightSpeed" />
            </div>
            <div className="absolute top-4 right-4 opacity-50">
              <Image src="/yen.png" width={80} height={80} alt="Yen" className="animate-pulse" />
            </div>
          </div>

        )}

        <h1 className="text-5xl font-extrabold text-gray-900">
          Fast, Secure & Easy Payments
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          The future of seamless digital transactions is here.
        </p>

        <button className="mt-8 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Get the App
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <h2 className="text-center text-4xl font-bold text-gray-900">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          <div className="p-6 max-w-xs bg-blue-50 rounded-lg shadow-lg text-center">
            <Image src="/security-icon.png" width={60} height={60} alt="Secure" />
            <h3 className="text-xl font-semibold mt-4">Secure Transactions</h3>
            <p className="text-gray-600 mt-2">End-to-end encrypted payments.</p>
          </div>
          <div className="p-6 max-w-xs bg-blue-50 rounded-lg shadow-lg text-center">
            <Image src="/fast-icon.png" width={60} height={60} alt="Fast" />
            <h3 className="text-xl font-semibold mt-4">Lightning Fast</h3>
            <p className="text-gray-600 mt-2">Instant money transfers anytime.</p>
          </div>
          <div className="p-6 max-w-xs bg-blue-50 rounded-lg shadow-lg text-center">
            <Image src="/support-icon.png" width={60} height={60} alt="Support" />
            <h3 className="text-xl font-semibold mt-4">24/7 Support</h3>
            <p className="text-gray-600 mt-2">Get help anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        <p>© 2025 PayFast. All Rights Reserved.</p>
      </footer>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes lightSpeed {
          0% { transform: translateX(-100%); opacity: 0.2; }
          50% { transform: translateX(50%); opacity: 0.5; }
          100% { transform: translateX(100%); opacity: 0.2; }
        }
        .animate-lightSpeed {
          animation: lightSpeed 1s linear;
        }

        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}