export default function Navbar() {
  return (
    <nav className="flex items-center border rounded-1xl border-white justify-between px-8 py-4 bg-gradient-to from-blue-200 to-white shadow-md">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-gray-900">Paymatter</div>

      {/* Navigation Links (Hidden on Mobile) */}
      <div className="hidden md:flex space-x-6 text-gray-700">
        <span className="cursor-pointer hover:text-blue-500 transition">Send & Receive</span>
        <span className="cursor-pointer hover:text-blue-500 transition">Pay Now</span>
        <span className="cursor-pointer hover:text-blue-500 transition">Help Center</span>
      </div>

      {/* Action Buttons */}
      <div className="space-x-4">
        <button className="px-6 py-2 text-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-100 transition">
          Login
        </button>
        <button className="px-6 py-2 text-white bg-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
          Signup
        </button>
      </div>
    </nav>
  );
}
