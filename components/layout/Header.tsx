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
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b-3 border-true-black">
      <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            {/* Heart+Bagel icon only on mobile */}
            <div className="relative w-10 h-10 sm:hidden">
              <Image
                src="/images/logo-heart-bagel.png"
                alt="Bagel Bros"
                fill
                className="object-contain group-hover:opacity-80 transition-opacity duration-300"
                priority
              />
            </div>
            {/* Horizontal logo on desktop */}
            <div className="relative hidden sm:block w-52 lg:w-64 h-10">
              <Image
                src="/images/logo-heart-horizontal.png"
                alt="Bagel Bros"
                fill
                className="object-contain object-left group-hover:opacity-80 transition-opacity duration-300"
                priority
              />
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6 sm:gap-8 lg:gap-12">
            <Link
              href="/about"
              className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:text-bagel-tan transition-colors duration-300 hidden sm:block"
            >
              Manifesto
            </Link>

            {dropConfig.isShopEnabled && (
              <Link
                href="/shop"
                className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:text-bagel-tan transition-colors duration-300"
              >
                Shop
              </Link>
            )}

            {dropConfig.isShopEnabled && (
              <button
                onClick={openCart}
                className="relative group"
                aria-label="Open cart"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-7 h-7 sm:w-8 sm:h-8 group-hover:text-bagel-tan transition-colors duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-bagel-tan text-true-black text-xs font-mono font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-true-black">
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
