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
    <div className="space-y-8">
      {/* Size Label */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="font-mono text-xs uppercase tracking-wider font-bold">
            Select Size
          </label>
          {selectedVariant && (
            <span className="font-mono text-xs text-true-black/50">
              {selectedVariant.title} Selected
            </span>
          )}
        </div>

        {/* Size Grid */}
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
                  group relative aspect-square border-3 font-mono text-sm font-bold
                  transition-all duration-200
                  ${isSelected
                    ? 'border-true-black bg-bagel-tan text-true-black shadow-brutal'
                    : isSoldOut
                    ? 'border-true-black/20 bg-true-black/5 text-true-black/30 cursor-not-allowed'
                    : 'border-true-black bg-cream hover:bg-bagel-tan hover:shadow-brutal'
                  }
                `}
              >
                {/* Size Label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-xl">
                    {variant.title}
                  </span>
                </div>

                {/* Low Stock Indicator */}
                {isLowStock && !isSoldOut && !isSelected && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-bagel-tan rounded-full animate-pulse"></div>
                )}

                {/* Sold Out Overlay */}
                {isSoldOut && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-true-black/30 rotate-45"></div>
                  </div>
                )}

                {/* Stock Count (Hover) */}
                {!isSoldOut && (
                  <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[10px] text-center pb-1">
                      {isLowStock ? `${variant.quantityAvailable} left` : 'In stock'}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add to Cart */}
      <AddToCartButton
        variantId={selectedVariant?.id || ''}
        disabled={!selectedVariant}
        productTitle={productTitle}
        size={selectedVariant?.title || ''}
      />

      {/* Size Guide Link */}
      <button className="font-mono text-xs uppercase tracking-wider text-true-black/50 hover:text-bagel-tan transition-colors border-b border-true-black/20 hover:border-bagel-tan">
        Size Guide
      </button>
    </div>
  );
}
