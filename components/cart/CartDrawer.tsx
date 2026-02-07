'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import CartItem from './CartItem';
import Link from 'next/link';

export default function CartDrawer() {
  const { isOpen, closeCart, lines, totalAmount, checkoutUrl } = useCartStore();

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
        className="fixed inset-0 bg-true-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-cream z-50 border-l-3 border-true-black flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-3 border-true-black bg-true-black text-cream">
          <div>
            <h2 className="font-display text-4xl">
              YOUR CART
            </h2>
            <p className="font-mono text-xs uppercase tracking-wider text-cream/60 mt-1">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-12 h-12 border-2 border-cream/30 hover:border-cream hover:bg-cream/10 transition-all duration-300 flex items-center justify-center"
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
            <div className="text-center py-20">
              <div className="font-display text-6xl text-true-black/10 mb-4">
                EMPTY
              </div>
              <p className="font-mono text-sm text-true-black/50 mb-6">
                Your cart is empty
              </p>
              <button
                onClick={closeCart}
                className="font-mono text-xs uppercase tracking-wider border-b-2 border-true-black hover:border-bagel-tan hover:text-bagel-tan transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {lines.map((line) => (
                <CartItem key={line.id} line={line} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t-3 border-true-black p-6 bg-cream space-y-6">
            {/* Subtotal */}
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-sm uppercase tracking-wider">Subtotal</span>
              <span className="font-display text-4xl">
                ${parseFloat(totalAmount).toFixed(2)}
              </span>
            </div>

            <p className="font-mono text-xs text-true-black/50 text-center">
              Shipping and taxes calculated at checkout
            </p>

            {/* Checkout Button */}
            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                className="block w-full py-5 border-brutal border-brutal-hover bg-bagel-tan text-true-black font-mono text-sm font-bold uppercase tracking-wider text-center transition-all duration-200"
              >
                Proceed to Checkout
              </a>
            ) : (
              <button
                disabled
                className="w-full py-5 bg-true-black/20 text-true-black/40 font-mono text-sm font-bold uppercase tracking-wider cursor-not-allowed border-3 border-true-black/20"
              >
                Checkout Unavailable
              </button>
            )}

            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center font-mono text-xs uppercase tracking-wider text-true-black/50 hover:text-bagel-tan transition-colors border-b border-true-black/20 hover:border-bagel-tan pb-1"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
