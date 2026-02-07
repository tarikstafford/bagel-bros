'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart-store';
import { getDropConfig } from '@/lib/config/drop-config';

export default function Header() {
  const { lines, openCart } = useCartStore();
  const dropConfig = getDropConfig();
  const itemCount = lines.reduce((acc, line) => acc + line.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-true-white border-b border-true-black/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="font-display text-xl sm:text-2xl tracking-tight hover:text-bagel-tan transition-colors">
            BAGEL BROS
          </Link>

          <div className="flex items-center gap-4 sm:gap-8">
            <Link
              href="/about"
              className="text-sm sm:text-base font-medium hover:text-bagel-tan transition-colors"
            >
              About
            </Link>

            {dropConfig.isShopEnabled && (
              <Link
                href="/shop"
                className="text-sm sm:text-base font-medium hover:text-bagel-tan transition-colors"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:text-bagel-tan transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bagel-tan text-true-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
