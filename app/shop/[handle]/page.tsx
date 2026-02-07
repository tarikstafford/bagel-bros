import { storefrontClient, ShopifyProduct } from '@/lib/shopify/client';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify/queries';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import SizeSelector from '@/components/shop/SizeSelector';
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
  const totalInventory = variants.reduce((sum, v) => sum + v.quantityAvailable, 0);
  const isLowStock = totalInventory > 0 && totalInventory <= 10;

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/5] bg-true-black/5 border-3 border-true-black overflow-hidden group"
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index === 0}
                    />
                  </div>
                ))
              ) : (
                <div className="aspect-[4/5] bg-true-black/5 border-3 border-true-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-9xl text-true-black/10 mb-4">6-0</div>
                    <p className="font-mono text-sm text-true-black/40">No image available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-8">
              {/* Header */}
              <div>
                <div className="font-mono text-xs uppercase tracking-wider bg-true-black text-cream px-3 py-1 inline-block mb-4">
                  Drop 001
                </div>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mb-4 leading-none">
                  {product.title}
                </h1>
                <div className="font-mono text-2xl sm:text-3xl font-bold">
                  ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="border-t-2 border-true-black/10 pt-6">
                  <p className="font-mono text-sm leading-relaxed text-true-black/80">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Stock Warning */}
              {isLowStock && (
                <div className="border-brutal bg-bagel-tan/20 p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-bagel-tan rounded-full mt-2 animate-pulse"></div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider font-bold mb-1">
                        Low Stock Alert
                      </div>
                      <p className="font-mono text-sm text-true-black/70">
                        Only {totalInventory} units remaining. No restocks planned.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="border-t-2 border-true-black/10 pt-8">
                <SizeSelector variants={variants} productTitle={product.title} />
              </div>

              {/* Product Promises */}
              <div className="border-t-2 border-true-black/10 pt-8 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-true-black rounded-full"></div>
                  <span>Premium quality construction</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-true-black rounded-full"></div>
                  <span>Limited edition — no restocks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-true-black rounded-full"></div>
                  <span>Ships within 2-3 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 30;
