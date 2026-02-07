export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl sm:text-5xl mb-8">
        Terms of Service
      </h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-sm text-true-black/60">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Bagel Bros, you accept and agree to be bound by these Terms of Service.
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">2. Product Availability</h2>
        <p>
          All products are available in limited quantities. We reserve the right to limit quantities
          and discontinue products at any time. No restocks are guaranteed.
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">3. Pricing and Payment</h2>
        <p>
          All prices are in USD. Payment is processed securely through Shopify. We accept major credit
          cards and other payment methods as available through our payment processor.
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">4. Shipping and Delivery</h2>
        <p>
          Shipping times and costs vary by location. We are not responsible for delays caused by
          shipping carriers or customs.
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">5. Returns and Exchanges</h2>
        <p>
          Due to the limited nature of our drops, all sales are final. We only accept returns for
          defective or damaged items within 14 days of delivery.
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">6. Intellectual Property</h2>
        <p>
          All content, designs, and branding on this site are owned by Bagel Bros and protected by
          copyright and trademark laws.
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">7. Contact</h2>
        <p>
          For questions about these terms, please contact us through our social media channels.
        </p>
      </div>
    </div>
  );
}
