"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMobileMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="sticky top-0 w-full z-10 h-max bg-black/40">
      <div className="md:max-w-screen-xl mx-auto h-16 flex items-center justify-between px-8">
        <Link
          className="antialiased block hover:scale-105 active:scale-95 transition transition-duration-150 ease-linear text-lg font-semibold"
          href="/"
        >
          Anime Finder
        </Link>
        <div className="flex items-center">
          <nav className="hidden lg:block">
            <ul>
              <li>
                <Link
                  href="/animes/search"
                  className="antialiased block hover:scale-105 active:scale-95 transition transition-duration-150 ease-linear"
                >
                  Search
                </Link>
              </li>
            </ul>
          </nav>
          <button
            className="lg:hidden active:scale-95 transition-all"
            type="button"
            onClick={toggleMobileMenu}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {openMenu && (
        <div className="flex flex-column w-full">
          <Link href="/animes/search">Search</Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
