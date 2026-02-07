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

      // Create cart if it doesn't exist
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
        // Add to existing cart
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

      toast.success(`Added ${productTitle} (${size}) to cart`);
      openCart();
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isLoading}
      className="w-full py-4 px-8 bg-true-black text-true-white font-display text-lg rounded-lg hover:bg-bagel-tan hover:text-true-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-true-black disabled:hover:text-true-white"
    >
      {isLoading ? 'Adding...' : disabled ? 'Select a Size' : 'Add to Cart'}
    </button>
  );
}
