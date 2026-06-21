import React from "react";

export default function Footer() {
return ( <footer className="relative bg-[#0A0A0A] border-t border-yellow-500/10"> <div className="max-w-7xl mx-auto px-6 py-10">


    <div className="flex flex-col items-center justify-center text-center">

      {/* Small Label */}
      <span className="text-xs uppercase tracking-[0.3em] text-yellow-500 mb-3">
        Technology Partner
      </span>

      {/* Company Name */}
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        TN International (Pvt) Ltd
      </h2>

      {/* Description */}
      <p className="mt-3 text-gray-400 max-w-xl leading-relaxed">
        Website Designed & Developed by TN International (Pvt) Ltd.
        Delivering modern, scalable and professional digital solutions.
      </p>

      {/* Contact */}
      <div className="mt-6">
        <a
          href="tel:0761918718"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full
          border border-yellow-500/20 bg-yellow-500/5
          hover:bg-yellow-500/10 transition-all duration-300"
        >
          <span className="text-yellow-500 text-lg">☎</span>
          <span className="font-semibold text-white">
            076 191 8718
          </span>
        </a>
      </div>

    </div>

    {/* Bottom Section */}
    <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">

      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} All Rights Reserved.
      </p>

      <p className="text-gray-500 text-sm">
        Powered by{" "}
        <span className="text-yellow-500 font-medium">
          TN International (Pvt) Ltd
        </span>
      </p>

    </div>
  </div>
</footer>


);
}
