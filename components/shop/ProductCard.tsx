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

  // Calculate total available inventory
  const totalInventory = product.variants.edges.reduce(
    (sum, variant) => sum + variant.node.quantityAvailable,
    0
  );

  const isLowStock = totalInventory > 0 && totalInventory <= 5;
  const isSoldOut = totalInventory === 0;

  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group relative bg-white border-2 border-true-black/10 rounded-lg overflow-hidden hover:border-bagel-tan transition-all hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="aspect-square relative bg-cream overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-true-black/30 font-display text-2xl">
              No Image
            </span>
          </div>
        )}

        {/* Stock Badge */}
        {isSoldOut && (
          <div className="absolute top-4 right-4 bg-true-black text-true-white px-3 py-1 rounded-full text-xs font-bold">
            SOLD OUT
          </div>
        )}
        {isLowStock && !isSoldOut && (
          <div className="absolute top-4 right-4 bg-bagel-tan text-true-black px-3 py-1 rounded-full text-xs font-bold">
            ONLY {totalInventory} LEFT
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-6">
        <h3 className="font-display text-lg sm:text-xl mb-2 group-hover:text-bagel-tan transition-colors">
          {product.title}
        </h3>
        <p className="text-sm sm:text-base font-medium">
          {currency === 'USD' ? '$' : currency}
          {price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
