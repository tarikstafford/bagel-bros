'use client';

import { useCartStore } from '@/lib/store/cart-store';
import CartItem from '@/components/cart/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { lines, totalAmount, checkoutUrl } = useCartStore();

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl sm:text-5xl mb-8">
        Your Cart
      </h1>

      {lines.length === 0 ? (
        <div className="text-center py-16 bg-cream rounded-lg">
          <p className="text-xl text-true-black/70 mb-4">
            Your cart is empty
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-true-black text-true-white font-display rounded-lg hover:bg-bagel-tan hover:text-true-black transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm text-true-black/60 mb-4">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
            {lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream border-2 border-true-black/10 rounded-lg p-6 sticky top-24">
              <h2 className="font-display text-xl mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-true-black/70">Subtotal</span>
                  <span className="font-medium">
                    ${parseFloat(totalAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-true-black/70">Shipping</span>
                  <span className="text-true-black/60">
                    Calculated at checkout
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-true-black/70">Taxes</span>
                  <span className="text-true-black/60">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="border-t-2 border-true-black/10 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-2xl">
                    ${parseFloat(totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>

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

              <div className="mt-4 text-xs text-center text-true-black/60">
                Secure checkout powered by Shopify
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
