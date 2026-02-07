import { storefrontClient, ShopifyProduct } from '@/lib/shopify/client';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify/queries';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import SizeSelector from '@/components/shop/SizeSelector';
import AddToCartButton from '@/components/shop/AddToCartButton';
import { getDropConfig } from '@/lib/config/drop-config';

async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const response = await storefrontClient.request(GET_PRODUCT_BY_HANDLE, {
      handle,
    });

    const data = response as any;
    return data.product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const dropConfig = getDropConfig();

  if (!dropConfig.isShopEnabled) {
    redirect('/');
  }

  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const images = product.images.edges.map((edge) => edge.node);
  const variants = product.variants.edges.map((edge) => edge.node);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative bg-cream rounded-lg overflow-hidden border-2 border-true-black/10"
              >
                <Image
                  src={image.url}
                  alt={image.altText || `${product.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))
          ) : (
            <div className="aspect-square relative bg-cream rounded-lg flex items-center justify-center border-2 border-true-black/10">
              <span className="text-true-black/30 font-display text-3xl">
                No Image
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl sm:text-5xl mb-4">
              {product.title}
            </h1>
            <p className="text-2xl sm:text-3xl font-display">
              ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
          </div>

          {product.description && (
            <div className="prose prose-lg">
              <p className="text-true-black/70">{product.description}</p>
            </div>
          )}

          {/* Size Selector and Add to Cart */}
          <div className="border-t-2 border-true-black/10 pt-6">
            <SizeSelector variants={variants} productTitle={product.title} />
          </div>

          {/* Scarcity Message */}
          <div className="bg-bagel-tan/10 border-2 border-bagel-tan/20 rounded-lg p-4">
            <p className="text-sm font-medium text-center">
              ⚠️ Limited quantities available. No restocks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 30;
