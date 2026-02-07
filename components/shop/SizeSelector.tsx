'use client';

import { useState } from 'react';
import AddToCartButton from './AddToCartButton';

interface Variant {
  id: string;
  title: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  quantityAvailable: number;
}

interface SizeSelectorProps {
  variants: Variant[];
  productTitle: string;
}

export default function SizeSelector({ variants, productTitle }: SizeSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-display text-lg mb-4">
          Select Size
        </label>
        <div className="grid grid-cols-4 gap-3">
          {variants.map((variant) => {
            const isSelected = selectedVariant?.id === variant.id;
            const isLowStock = variant.quantityAvailable > 0 && variant.quantityAvailable <= 3;
            const isSoldOut = !variant.availableForSale || variant.quantityAvailable === 0;

            return (
              <button
                key={variant.id}
                onClick={() => !isSoldOut && setSelectedVariant(variant)}
                disabled={isSoldOut}
                className={`
                  relative min-h-[60px] px-4 py-3 border-2 rounded-lg font-medium transition-all
                  ${isSelected
                    ? 'border-bagel-tan bg-bagel-tan text-true-black'
                    : isSoldOut
                    ? 'border-true-black/10 bg-true-black/5 text-true-black/30 cursor-not-allowed'
                    : 'border-true-black/20 hover:border-bagel-tan'
                  }
                `}
              >
                <span className="block text-base sm:text-lg">
                  {variant.title}
                </span>
                {isLowStock && !isSoldOut && !isSelected && (
                  <span className="block text-xs text-bagel-tan mt-1">
                    Only {variant.quantityAvailable} left
                  </span>
                )}
                {isSoldOut && (
                  <span className="block text-xs mt-1">
                    Sold Out
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AddToCartButton
        variantId={selectedVariant?.id || ''}
        disabled={!selectedVariant}
        productTitle={productTitle}
        size={selectedVariant?.title || ''}
      />
    </div>
  );
}
