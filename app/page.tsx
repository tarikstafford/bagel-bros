import Link from 'next/link';
import { getDropConfig, formatDropDate } from '@/lib/config/drop-config';
import WaitlistForm from '@/components/home/WaitlistForm';
import CountdownTimer from '@/components/home/CountdownTimer';

export default function HomePage() {
  const dropConfig = getDropConfig();

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-cream to-true-white py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl mb-6 tracking-tight">
              DROP 001
            </h1>

            {dropConfig.mode === 'pre-drop' && (
              <>
                <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-balance">
                  Premium streetwear for those who embrace the bagel.
                  <br />
                  <span className="text-bagel-tan font-display">
                    Limited quantities. No restocks.
                  </span>
                </p>

                {dropConfig.showCountdown && dropConfig.dropDate && (
                  <div className="mb-12">
                    <p className="text-sm sm:text-base font-medium mb-6 text-true-black/70">
                      Drops {formatDropDate(dropConfig.dropDate)}
                    </p>
                    <CountdownTimer targetDate={dropConfig.dropDate} />
                  </div>
                )}

                {dropConfig.showWaitlist && (
                  <div className="mt-12">
                    <h2 className="font-display text-2xl sm:text-3xl mb-6">
                      Join the 6-0 Club
                    </h2>
                    <WaitlistForm dropNumber="001" />
                  </div>
                )}
              </>
            )}

            {dropConfig.mode === 'live' && (
              <>
                <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-balance">
                  The drop is live. Limited quantities available.
                  <br />
                  <span className="text-bagel-tan font-display">
                    Once they&apos;re gone, they&apos;re gone.
                  </span>
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-12 py-5 bg-true-black text-true-white font-display text-xl rounded-lg hover:bg-bagel-tan hover:text-true-black transition-colors"
                >
                  Shop Drop 001
                </Link>
              </>
            )}

            {dropConfig.mode === 'sold-out' && (
              <>
                <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-balance">
                  Drop 001 is officially sold out.
                  <br />
                  <span className="text-bagel-tan font-display">
                    Thank you to everyone who copped.
                  </span>
                </p>
                {dropConfig.showWaitlist && (
                  <div className="mt-12">
                    <h2 className="font-display text-2xl sm:text-3xl mb-6">
                      Get Early Access to Drop 002
                    </h2>
                    <WaitlistForm dropNumber="002" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Brand Messaging */}
      <section className="py-16 sm:py-24 bg-true-black text-true-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-5xl mb-8">
              Getting Bageled Never Looked This Good
            </h2>
            <p className="text-lg sm:text-xl text-true-white/80 mb-6">
              Losing 6-0 is an art form. A badge of honor. A lifestyle.
            </p>
            <p className="text-lg sm:text-xl text-true-white/80 mb-6">
              Bagel Bros is for those who show up, get absolutely demolished, and come back for more with a smile.
            </p>
            <p className="text-lg sm:text-xl text-bagel-tan font-display">
              If you know, you know. 🥯
            </p>
          </div>
        </div>
      </section>

      {/* Scarcity Messaging */}
      {dropConfig.mode !== 'sold-out' && (
        <section className="py-16 bg-bagel-tan/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-display text-4xl mb-2">5</div>
                <div className="text-sm font-medium text-true-black/70">
                  SKUs Only
                </div>
              </div>
              <div>
                <div className="font-display text-4xl mb-2">Limited</div>
                <div className="text-sm font-medium text-true-black/70">
                  Quantities
                </div>
              </div>
              <div>
                <div className="font-display text-4xl mb-2">No</div>
                <div className="text-sm font-medium text-true-black/70">
                  Restocks Ever
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
