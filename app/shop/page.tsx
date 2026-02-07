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

  // Redirect if shop is not enabled
  if (!dropConfig.isShopEnabled) {
    redirect('/');
  }

  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl sm:text-6xl mb-4">
          Drop 001
        </h1>
        <p className="text-lg sm:text-xl text-true-black/70 mb-2">
          Limited quantities. No restocks.
        </p>
        <p className="text-sm font-medium text-bagel-tan">
          {products.length} {products.length === 1 ? 'item' : 'items'} available
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-true-black/70">
            No products available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export const revalidate = 30; // Revalidate every 30 seconds for inventory updates
