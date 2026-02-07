'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart-store';
import { getDropConfig } from '@/lib/config/drop-config';

export default function Header() {
  const { lines, openCart } = useCartStore();
  const dropConfig = getDropConfig();
  const itemCount = lines.reduce((acc, line) => acc + line.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream border-b-4 border-true-black">
      <nav className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-24 sm:h-28">
          {/* Logo + Brand - Left Side */}
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-4 group flex-shrink-0"
          >
            {/* Logo icon with border */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 border-3 border-true-black p-2 bg-white group-hover:bg-bagel-tan transition-colors duration-300">
              <Image
                src="/images/logo-heart-bagel.png"
                alt="Bagel Bros Logo"
                fill
                className="object-contain p-1"
                priority
                sizes="64px"
              />
            </div>

            {/* Brand text */}
            <div className="flex flex-col">
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight leading-none group-hover:text-bagel-tan transition-colors duration-300">
                BAGEL BROS
              </h1>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-true-black/60 mt-0.5">
                6-0 Club
              </span>
            </div>
          </Link>

          {/* Navigation - Right Side */}
          <div className="flex items-center gap-8 sm:gap-10 lg:gap-14">
            <Link
              href="/about"
              className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider hover:text-bagel-tan transition-colors duration-300 hidden md:block"
            >
              Manifesto
            </Link>

            {dropConfig.isShopEnabled && (
              <Link
                href="/shop"
                className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider hover:text-bagel-tan transition-colors duration-300"
              >
                Shop
              </Link>
            )}

            {dropConfig.isShopEnabled && (
              <button
                onClick={openCart}
                className="relative group flex-shrink-0"
                aria-label="Open cart"
              >
                <div className="relative border-3 border-true-black p-2.5 sm:p-3 bg-white group-hover:bg-bagel-tan transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-true-black text-cream text-xs font-mono font-bold w-7 h-7 flex items-center justify-center border-3 border-true-black">
                      {itemCount}
                    </span>
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
