"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Panduan", href: "/panduan" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-white shadow-md h-16">
      <div className="flex justify-center h-full">
        <ul className="flex items-stretch h-full space-x-6 text-gray-700">
          {navItems.map((item) => (
            <li key={item.name} className="h-full">
              <a
                href={item.href}
                className={`px-4 h-full flex items-center transition ${
                  isActive(item.href)
                    ? "bg-slate-100 text-black"
                    : "hover:text-blue-600"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li className="relative h-full">
            <div className="flex items-center h-full">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-4 h-full flex items-center transition ${
                  pathname.startsWith("/akun")
                    ? "bg-slate-900 text-white"
                    : "hover:text-blue-600"
                }`}
              >
                Akun
              </button>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <a
                  href="/akun/setting"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Setting
                </a>
                <button
                  onClick={() => alert("Keluar")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Keluar
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
