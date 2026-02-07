import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 text-6xl">🥯</div>

        <h1 className="font-display text-4xl sm:text-6xl mb-6">
          You&apos;re Officially in the 6-0 Club!
        </h1>

        <div className="bg-bagel-tan/10 border-2 border-bagel-tan rounded-lg p-8 mb-8">
          <p className="text-xl mb-4">
            Order confirmed. Check your email for details.
          </p>
          <p className="text-true-black/70">
            Your premium streetwear will be with you soon.
            Wear it with pride (or wear it while getting bageled).
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl mb-4">
            What&apos;s Next?
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-cream border-2 border-true-black/10 rounded-lg p-6">
              <h3 className="font-display text-lg mb-2">Share the Love</h3>
              <p className="text-sm text-true-black/70 mb-4">
                Tag us on Instagram with your Bagel Bros gear
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bagel-tan font-medium hover:underline"
              >
                @bagelbros
              </a>
            </div>

            <div className="bg-cream border-2 border-true-black/10 rounded-lg p-6">
              <h3 className="font-display text-lg mb-2">Join the Community</h3>
              <p className="text-sm text-true-black/70 mb-4">
                Get early access to future drops and exclusive content
              </p>
              <Link
                href="/"
                className="text-bagel-tan font-medium hover:underline"
              >
                Sign up for Drop 002
              </Link>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-true-black text-true-white font-display rounded-lg hover:bg-bagel-tan hover:text-true-black transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
