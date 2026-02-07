'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { storefrontClient } from '@/lib/shopify/client';
import { CREATE_CART, ADD_TO_CART } from '@/lib/shopify/mutations';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  variantId: string;
  disabled?: boolean;
  productTitle: string;
  size: string;
}

export default function AddToCartButton({
  variantId,
  disabled = false,
  productTitle,
  size,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { cartId, setCartId, setCheckoutUrl, setLines, setTotalAmount, openCart } = useCartStore();

  const handleAddToCart = async () => {
    if (!variantId || disabled) return;

    setIsLoading(true);

    try {
      let currentCartId = cartId;

      if (!currentCartId) {
        const createResponse = await storefrontClient.request(CREATE_CART, {
          input: {
            lines: [
              {
                merchandiseId: variantId,
                quantity: 1,
              },
            ],
          },
        });

        const createData = createResponse as any;

        if (createData.cartCreate?.userErrors?.length > 0) {
          throw new Error(createData.cartCreate.userErrors[0].message);
        }

        const cart = createData.cartCreate.cart;
        currentCartId = cart.id;
        setCartId(cart.id);
        setCheckoutUrl(cart.checkoutUrl);
        setLines(cart.lines.edges.map((edge: any) => edge.node));
        setTotalAmount(cart.cost.totalAmount.amount);
      } else {
        const addResponse = await storefrontClient.request(ADD_TO_CART, {
          cartId: currentCartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity: 1,
            },
          ],
        });

        const addData = addResponse as any;

        if (addData.cartLinesAdd?.userErrors?.length > 0) {
          throw new Error(addData.cartLinesAdd.userErrors[0].message);
        }

        const cart = addData.cartLinesAdd.cart;
        setCheckoutUrl(cart.checkoutUrl);
        setLines(cart.lines.edges.map((edge: any) => edge.node));
        setTotalAmount(cart.cost.totalAmount.amount);
      }

      toast.success(`Added ${productTitle} (${size})`, {
        style: {
          background: '#D4A574',
          color: '#0A0A0A',
          fontFamily: 'Space Mono, monospace',
          fontSize: '14px',
          fontWeight: 'bold',
        },
      });
      openCart();
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart', {
        style: {
          background: '#0A0A0A',
          color: '#FEFEFE',
          fontFamily: 'Space Mono, monospace',
          fontSize: '14px',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isLoading}
      className={`
        w-full py-6 font-mono text-sm font-bold uppercase tracking-wider
        transition-all duration-300
        ${disabled || isLoading
          ? 'bg-true-black/20 text-true-black/40 cursor-not-allowed border-3 border-true-black/20'
          : 'border-brutal border-brutal-hover bg-bagel-tan text-true-black'
        }
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-true-black/30 border-t-true-black rounded-full animate-spin"></div>
          Adding...
        </span>
      ) : disabled ? (
        'Select a Size First'
      ) : (
        'Add to Cart — Secure Checkout'
      )}
    </button>
  );
}
