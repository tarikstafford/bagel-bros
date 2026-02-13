import { storefrontClient, ShopifyProduct } from '@/lib/shopify/client';
import { GET_PRODUCTS_BY_TAG } from '@/lib/shopify/queries';
import ProductCard from '@/components/shop/ProductCard';
import { getDropConfig } from '@/lib/config/drop-config';
import { redirect } from 'next/navigation';

async function getProducts(): Promise<ShopifyProduct[]> {
  try {
    const response = await storefrontClient.request(GET_PRODUCTS_BY_TAG, {
      query: 'tag:drop-001',
      first: 20,
    });

    const data = response as any;
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ShopPage() {
  const dropConfig = getDropConfig();

  if (!dropConfig.isShopEnabled) {
    redirect('/');
  }

  const products = await getProducts();

  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-20">
      {/* Hero Header */}
      <section className="bg-true-black text-cream py-16 sm:py-20 mb-16 sm:mb-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div className="font-mono text-xs uppercase tracking-wider bg-bagel-tan text-true-black px-4 py-2 inline-block mb-6">
              Now Available
            </div>
            <h1 className="font-display text-display-lg mb-6">
              DROP 001
              <br />
              <span className="text-bagel-tan">THE FIRST</span>
              <br />
              COLLECTION
            </h1>
            <div className="flex flex-wrap gap-8 font-mono text-sm">
              <div>
                <div className="text-cream/50 text-xs uppercase tracking-wider mb-1">Items</div>
                <div className="font-bold">{products.length} SKUs</div>
              </div>
              <div>
                <div className="text-cream/50 text-xs uppercase tracking-wider mb-1">Policy</div>
                <div className="font-bold">No Restocks</div>
              </div>
              <div>
                <div className="text-cream/50 text-xs uppercase tracking-wider mb-1">Status</div>
                <div className="font-bold text-bagel-tan">Live Now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="font-display text-display-md mb-4 text-true-black/20">
              NO PRODUCTS
            </div>
            <p className="font-mono text-sm text-true-black/50">
              Check back soon or join the waitlist
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 mt-20 sm:mt-32">
        <div className="border-brutal bg-cream p-8 sm:p-12 text-center">
          <h2 className="font-display text-4xl sm:text-5xl mb-4">
            ONCE THEY&apos;RE GONE,
            <br />
            <span className="text-bagel-tan">THEY&apos;RE GONE</span>
          </h2>
          <p className="font-mono text-sm text-true-black/60 max-w-xl mx-auto">
            Limited quantities. No restocks. Ever.
          </p>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 30;
