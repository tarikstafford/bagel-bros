export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl sm:text-5xl mb-8">
        Privacy Policy
      </h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-sm text-true-black/60">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, including:
        </p>
        <ul>
          <li>Email address (for waitlist and order notifications)</li>
          <li>Shipping and billing information (for order fulfillment)</li>
          <li>Payment information (processed securely by Shopify)</li>
        </ul>

        <h2 className="font-display text-2xl mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Send you drop announcements and updates (if you opt in)</li>
          <li>Improve our products and services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="font-display text-2xl mt-8 mb-4">3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We share your information only with:
        </p>
        <ul>
          <li>Shopify (for payment processing and order fulfillment)</li>
          <li>Shipping carriers (to deliver your orders)</li>
          <li>Service providers who assist in operating our business</li>
        </ul>

        <h2 className="font-display text-2xl mt-8 mb-4">4. Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies to improve your browsing experience and analyze
          site traffic. You can control cookies through your browser settings.
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">5. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal information. However,
          no method of transmission over the Internet is 100% secure.
        </p>

        <h2 className="font-display text-2xl mt-8 mb-4">6. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>

        <h2 className="font-display text-2xl mt-8 mb-4">7. Contact Us</h2>
        <p>
          For privacy-related questions or requests, please contact us through our social media channels.
        </p>
      </div>
    </div>
  );
}
