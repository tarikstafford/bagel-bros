import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/shopify/client';
import { CREATE_CUSTOMER } from '@/lib/shopify/mutations';

export async function POST(request: NextRequest) {
  try {
    const { email, dropNumber } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create customer in Shopify with waitlist tags
    const tags = [`waitlist-drop-${dropNumber || '001'}`, '6-0-club'];

    const response = await adminClient.request(CREATE_CUSTOMER, {
      input: {
        email,
        tags,
        acceptsMarketing: true,
      },
    });

    const result = response as any;

    if (result.customerCreate?.userErrors?.length > 0) {
      const error = result.customerCreate.userErrors[0];
      return NextResponse.json(
        { error: error.message || 'Failed to add to waitlist' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "You're on the list!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
