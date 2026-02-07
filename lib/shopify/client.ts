import { GraphQLClient } from 'graphql-request';

const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

export const storefrontClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    'Content-Type': 'application/json',
  },
});

// Admin API client for waitlist customer creation
const adminEndpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`;

export const adminClient = new GraphQLClient(adminEndpoint, {
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
    'Content-Type': 'application/json',
  },
});

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        quantityAvailable: number;
      };
    }>;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
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
      };
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
};
