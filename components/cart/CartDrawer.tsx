'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import CartItem from './CartItem';
import Link from 'next/link';

export default function CartDrawer() {
  const { isOpen, closeCart, lines, totalAmount, checkoutUrl } = useCartStore();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-true-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-true-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-true-black/10">
          <h2 className="font-display text-2xl">
            Cart ({itemCount})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-true-black/5 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-true-black/70 mb-4">
                Your cart is empty
              </p>
              <button
                onClick={closeCart}
                className="text-bagel-tan font-medium hover:underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((line) => (
                <CartItem key={line.id} line={line} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t-2 border-true-black/10 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium">Subtotal</span>
              <span className="font-display text-2xl">
                ${parseFloat(totalAmount).toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-true-black/60 text-center">
              Shipping and taxes calculated at checkout
            </p>

            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                className="block w-full py-4 px-8 bg-true-black text-true-white font-display text-lg text-center rounded-lg hover:bg-bagel-tan hover:text-true-black transition-colors"
              >
                Checkout
              </a>
            ) : (
              <button
                disabled
                className="w-full py-4 px-8 bg-true-black/20 text-true-white font-display text-lg rounded-lg cursor-not-allowed"
              >
                Checkout Unavailable
              </button>
            )}

            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-sm text-bagel-tan hover:underline"
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
