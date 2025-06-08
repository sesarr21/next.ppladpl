"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Settings, LogOut } from "lucide-react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Panduan", href: "/panduan" },
  ];

  const isActive = (href) => pathname === href;

  const handleLogout = () => {
    router.push("/");  // Redirect ke halaman root
  };

  return (
    <nav className="bg-white shadow-md h-16">
      <div className="flex justify-between items-center h-full px-10">
        {/* Kiri: Ganti tulisan dengan logo */}
        <div className="flex items-center h-full">
          <Image src="/logo.png" alt="SmartDrain Logo" width={120} height={120} />
        </div>

        {/* Tengah: Navigasi */}
        <ul className="flex items-stretch h-full space-x-6 text-gray-700">
          {navItems.map((item) => (
            <li key={item.name} className="h-full">
              <a
                href={item.href}
                className={`px-4 h-full flex items-center transition ${
                  isActive(item.href)
                    ? "bg-slate-100 text-black"
                    : "hover:text-[#205781]"
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
                    ? "bg-slate-100 text-black"
                    : "hover:text-[#205781]"
                }`}
              >
                Akun
              </button>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <a
                  href="/akun/setting"
                  className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <Settings className="w-5 h-5" />
                  <span>Setting</span>
                </a>

                <button
                  onClick={handleLogout}
                  className="flex gap-2 px-4 py-2 w-full hover:bg-gray-100 text-red-600"
                >
                  <LogOut />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
