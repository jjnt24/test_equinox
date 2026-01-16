"use client";
import { useState } from "react";
import { Menu, X, Home, History, Coins, Info } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export function BrandLogo() {
  return (
    <div className="flex items-center gap-4 px-8">
      <div className="w-12 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
        L
      </div>
      <span className="font-semibold text-slate-800 text-lg">
        Logo
      </span>
    </div>
  );
}

export default function Sidebar({ locale }: { locale: any }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Sidebar');

  // Move menus inside component to access translations
  const menus = [
    { name: t('generator'), href: "/generator", icon: <Home size={18} /> },
    { name: t('history'), href: "/history", icon: <History size={18} /> },
  ];

  return (
    <>
      {/* Topbar for small screens */}
      <div className="fixed md:hidden top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-4 py-3">
        <BrandLogo />
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
            <Menu size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <aside className="fixed top-0 left-0 hidden md:flex flex-col w-60 h-screen bg-white shadow-sm border-r border-gray-200">
        <div className="py-6">
          <BrandLogo />
        </div>

        {/* Main navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={`/${locale}${menu.href}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                pathname.endsWith(menu.href)
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom section with controls and user menu */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          {/* Controls row */}
          <div className="flex items-center justify-between gap-2 px-2">
            <LanguageSwitcher />
          </div>

        </div>
      </aside>

      {/* Mobile menu modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-10/12 max-w-sm shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>

            <div className="flex flex-col space-y-3 mt-4">
              {menus.map((menu) => (
                <Link
                  key={menu.href}
                  href={`/${locale}${menu.href}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    pathname.endsWith(menu.href)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                </Link>
              ))}
              
              {/* Bottom section */}
              <div className="border-t pt-3 mt-3 space-y-3">
                {/* Language switcher in mobile */}
                <div className="px-2">
                  <LanguageSwitcher />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}