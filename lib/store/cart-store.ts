import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      featuredImage: {
        url: string;
      };
    };
    priceV2: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface CartState {
  cartId: string | null;
  checkoutUrl: string | null;
  lines: CartLine[];
  totalAmount: string;
  isOpen: boolean;
  isLoading: boolean;

  setCartId: (id: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLines: (lines: CartLine[]) => void;
  setTotalAmount: (amount: string) => void;
  openCart: () => void;
  closeCart: () => void;
  setLoading: (loading: boolean) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      checkoutUrl: null,
      lines: [],
      totalAmount: '0.00',
      isOpen: false,
      isLoading: false,

      setCartId: (id) => set({ cartId: id }),
      setCheckoutUrl: (url) => set({ checkoutUrl: url }),
      setLines: (lines) => set({ lines }),
      setTotalAmount: (amount) => set({ totalAmount: amount }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      clearCart: () => set({
        cartId: null,
        checkoutUrl: null,
        lines: [],
        totalAmount: '0.00',
        isOpen: false,
      }),
    }),
    {
      name: 'bagel-bros-cart',
      partialize: (state) => ({
        cartId: state.cartId,
        lines: state.lines,
      }),
    }
  )
);
