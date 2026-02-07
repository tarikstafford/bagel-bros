'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CartLine, useCartStore } from '@/lib/store/cart-store';
import { storefrontClient } from '@/lib/shopify/client';
import { UPDATE_CART_LINES, REMOVE_FROM_CART } from '@/lib/shopify/mutations';
import toast from 'react-hot-toast';

interface CartItemProps {
  line: CartLine;
}

export default function CartItem({ line }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { cartId, setLines, setTotalAmount } = useCartStore();

  const updateQuantity = async (newQuantity: number) => {
    if (!cartId || isUpdating) return;

    setIsUpdating(true);

    try {
      const response = await storefrontClient.request(UPDATE_CART_LINES, {
        cartId,
        lines: [
          {
            id: line.id,
            quantity: newQuantity,
          },
        ],
      });

      const data = response as any;

      if (data.cartLinesUpdate?.userErrors?.length > 0) {
        throw new Error(data.cartLinesUpdate.userErrors[0].message);
      }

      const cart = data.cartLinesUpdate.cart;
      setLines(cart.lines.edges.map((edge: any) => edge.node));
      setTotalAmount(cart.cost.totalAmount.amount);
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update', {
        style: {
          background: '#0A0A0A',
          color: '#FEFEFE',
          fontFamily: 'Space Mono, monospace',
          fontSize: '14px',
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async () => {
    if (!cartId || isUpdating) return;

    setIsUpdating(true);

    try {
      const response = await storefrontClient.request(REMOVE_FROM_CART, {
        cartId,
        lineIds: [line.id],
      });

      const data = response as any;

      if (data.cartLinesRemove?.userErrors?.length > 0) {
        throw new Error(data.cartLinesRemove.userErrors[0].message);
      }

      const cart = data.cartLinesRemove.cart;
      setLines(cart.lines.edges.map((edge: any) => edge.node));
      setTotalAmount(cart.cost.totalAmount.amount);
      toast.success('Removed from cart', {
        style: {
          background: '#D4A574',
          color: '#0A0A0A',
          fontFamily: 'Space Mono, monospace',
          fontSize: '14px',
        },
      });
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove', {
        style: {
          background: '#0A0A0A',
          color: '#FEFEFE',
          fontFamily: 'Space Mono, monospace',
          fontSize: '14px',
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const price = parseFloat(line.merchandise.priceV2.amount);
  const lineTotal = price * line.quantity;

  return (
    <div className="border-3 border-true-black bg-cream/50 p-4 relative">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-32 flex-shrink-0 bg-true-black/5 border-2 border-true-black overflow-hidden">
          <Image
            src={line.merchandise.product.featuredImage.url}
            alt={line.merchandise.product.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl mb-1 truncate">
              {line.merchandise.product.title}
            </h3>
            <p className="font-mono text-xs text-true-black/60 mb-3">
              Size {line.merchandise.title}
            </p>
          </div>

          {/* Bottom Row */}
          <div className="flex items-end justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center border-2 border-true-black">
              <button
                onClick={() => updateQuantity(line.quantity - 1)}
                disabled={isUpdating || line.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center hover:bg-true-black hover:text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-true-black"
                aria-label="Decrease quantity"
              >
                <span className="text-lg">−</span>
              </button>
              <span className="w-10 h-8 flex items-center justify-center font-mono text-sm font-bold border-x-2 border-true-black">
                {line.quantity}
              </span>
              <button
                onClick={() => updateQuantity(line.quantity + 1)}
                disabled={isUpdating}
                className="w-8 h-8 flex items-center justify-center hover:bg-true-black hover:text-cream transition-colors disabled:opacity-30"
                aria-label="Increase quantity"
              >
                <span className="text-lg">+</span>
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="font-mono text-lg font-bold">
                ${lineTotal.toFixed(2)}
              </div>
              {line.quantity > 1 && (
                <div className="font-mono text-[10px] text-true-black/50">
                  ${price.toFixed(2)} each
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={removeItem}
        disabled={isUpdating}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center hover:bg-true-black hover:text-cream transition-colors disabled:opacity-50"
        aria-label="Remove item"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
