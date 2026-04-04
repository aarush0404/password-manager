import React from "react";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-[#0E103D] text-white px-6 py-3 flex justify-between items-center shadow-md">
      
      {/* Logo / Project Name */}
      <h1 className="text-xl font-bold tracking-wide">
        🔐 Pass Saver
      </h1>

      {/* Buttons */}
      <div className="flex gap-4 items-center">
        <span className="text-sm opacity-80 hidden sm:block">
          Secure your passwords
        </span>

        <button
          onClick={logout}
          className="bg-[#A5668B] px-4 py-1 rounded hover:bg-[#69306D] transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;