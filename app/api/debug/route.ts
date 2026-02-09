import { NextResponse } from 'next/server';
import { storefrontClient } from '@/lib/shopify/client';
import { GET_PRODUCTS_BY_TAG } from '@/lib/shopify/queries';

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    shopifyDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? '✅ Set' : '❌ Missing',
    storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? '✅ Set' : '❌ Missing',
    dropMode: process.env.NEXT_PUBLIC_DROP_MODE || '❌ Not set',
    productsTest: null as any,
  };

  try {
    const response = await storefrontClient.request(GET_PRODUCTS_BY_TAG, {
      query: 'tag:drop-001',
      first: 20,
    });

    const data = response as any;
    const products = data.products.edges.map((edge: any) => edge.node);

    diagnostics.productsTest = {
      status: '✅ Success',
      count: products.length,
      products: products.map((p: any) => ({
        title: p.title,
        handle: p.handle,
      })),
    };
  } catch (error: any) {
    diagnostics.productsTest = {
      status: '❌ Failed',
      error: error.message,
    };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
