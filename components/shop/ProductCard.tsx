import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/lib/shopify/client';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  const totalInventory = product.variants.edges.reduce(
    (sum, variant) => sum + variant.node.quantityAvailable,
    0
  );

  const isLowStock = totalInventory > 0 && totalInventory <= 5;
  const isSoldOut = totalInventory === 0;

  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group block"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-true-black/5 border-3 border-true-black overflow-hidden mb-4">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display text-6xl text-true-black/10">6-0</div>
          </div>
        )}

        {/* Status Badge */}
        {isSoldOut && (
          <div className="absolute top-4 right-4 bg-true-black text-cream px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider">
            Sold Out
          </div>
        )}
        {isLowStock && !isSoldOut && (
          <div className="absolute top-4 right-4 bg-bagel-tan text-true-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
            Only {totalInventory} Left
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-bagel-tan/0 group-hover:bg-bagel-tan/20 transition-colors duration-300"></div>

        {/* Quick View Hint */}
        <div className="absolute inset-x-0 bottom-0 bg-true-black/90 text-cream py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="font-mono text-xs uppercase tracking-wider text-center">
            View Details →
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-display text-xl sm:text-2xl group-hover:text-bagel-tan transition-colors duration-300 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <div className="font-mono text-sm font-bold">
            {currency === 'USD' ? '$' : currency}
            {price.toFixed(2)}
          </div>
          <div className="font-mono text-xs uppercase tracking-wider text-true-black/50">
            {isSoldOut ? 'Sold Out' : 'Available'}
          </div>
        </div>
      </div>
    </Link>
  );
}
