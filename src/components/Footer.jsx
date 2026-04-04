import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0E103D] text-white text-center py-3 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Pass Saver • Made with ❤️
      </p>
    </footer>
  );
};

export default Footer;