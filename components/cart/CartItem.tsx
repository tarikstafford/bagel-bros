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
      toast.error('Failed to update quantity');
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
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
    } finally {
      setIsUpdating(false);
    }
  };

  const price = parseFloat(line.merchandise.priceV2.amount);
  const lineTotal = price * line.quantity;

  return (
    <div className="flex gap-4 p-4 border-2 border-true-black/10 rounded-lg">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-cream rounded-lg overflow-hidden">
        <Image
          src={line.merchandise.product.featuredImage.url}
          alt={line.merchandise.product.title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm sm:text-base mb-1 truncate">
          {line.merchandise.product.title}
        </h3>
        <p className="text-xs sm:text-sm text-true-black/60 mb-2">
          Size: {line.merchandise.title}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border-2 border-true-black/20 rounded-lg">
            <button
              onClick={() => updateQuantity(line.quantity - 1)}
              disabled={isUpdating || line.quantity <= 1}
              className="px-3 py-1 hover:bg-true-black/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-3 py-1 min-w-[2rem] text-center font-medium">
              {line.quantity}
            </span>
            <button
              onClick={() => updateQuantity(line.quantity + 1)}
              disabled={isUpdating}
              className="px-3 py-1 hover:bg-true-black/5 transition-colors disabled:opacity-30"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={removeItem}
            disabled={isUpdating}
            className="text-xs text-bagel-tan hover:underline disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <p className="font-medium">${lineTotal.toFixed(2)}</p>
        {line.quantity > 1 && (
          <p className="text-xs text-true-black/60">
            ${price.toFixed(2)} each
          </p>
        )}
      </div>
    </div>
  );
}
