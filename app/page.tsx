import Link from 'next/link';
import { getDropConfig, formatDropDate } from '@/lib/config/drop-config';
import WaitlistForm from '@/components/home/WaitlistForm';
import CountdownTimer from '@/components/home/CountdownTimer';

export default function HomePage() {
  const dropConfig = getDropConfig();

  return (
    <div className="min-h-screen pt-20 sm:pt-24">
      {/* Hero Section - Brutalist Impact */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden grain">
        {/* Background Graphic Element */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="font-display text-[40vw] leading-none select-none">
            6-0
          </div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="animate-slide-up stagger-1">
              <div className="inline-block font-mono text-xs sm:text-sm uppercase tracking-wider bg-bagel-tan text-true-black px-4 py-2 mb-6 sm:mb-8">
                Drop 001 — Limited Release
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-display-xl mb-6 sm:mb-8 animate-slide-up stagger-2">
              GETTING
              <br />
              BAGELED
              <br />
              <span className="text-bagel-tan">NEVER</span>
              <br />
              LOOKED
              <br />
              THIS GOOD
            </h1>

            {/* Subheadline */}
            <p className="font-mono text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-12 leading-relaxed animate-slide-up stagger-3">
              Premium streetwear for the 6-0 Club. For those who show up, get destroyed, and come back with a smile. Limited quantities. Zero apologies. No restocks.
            </p>

            {/* CTA Based on Drop Mode */}
            {dropConfig.mode === 'pre-drop' && (
              <div className="animate-slide-up stagger-4">
                {dropConfig.showCountdown && dropConfig.dropDate && (
                  <div className="mb-12">
                    <div className="font-mono text-sm uppercase tracking-wider mb-6 text-true-black/60">
                      Drops {formatDropDate(dropConfig.dropDate)}
                    </div>
                    <CountdownTimer targetDate={dropConfig.dropDate} />
                  </div>
                )}
              </div>
            )}

            {dropConfig.mode === 'live' && (
              <div className="animate-slide-up stagger-4">
                <Link
                  href="/shop"
                  className="inline-block group"
                >
                  <div className="border-brutal border-brutal-hover bg-bagel-tan px-12 py-6 inline-block">
                    <span className="font-display text-3xl sm:text-4xl text-true-black">
                      Shop Drop 001
                    </span>
                  </div>
                </Link>
                <p className="font-mono text-xs uppercase tracking-wider mt-4 text-true-black/60">
                  Limited quantities available now →
                </p>
              </div>
            )}

            {dropConfig.mode === 'sold-out' && (
              <div className="animate-slide-up stagger-4">
                <div className="border-3 border-true-black bg-true-black text-cream px-8 py-6 inline-block mb-4">
                  <span className="font-display text-3xl sm:text-4xl">
                    Drop 001 Sold Out
                  </span>
                </div>
                <p className="font-mono text-sm text-true-black/80">
                  Thanks to everyone who copped. Drop 002 coming soon.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-true-black/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-true-black/30 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      {dropConfig.showWaitlist && (
        <section className="py-20 sm:py-32 bg-true-black text-cream relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 35px,
                  rgba(254, 254, 254, 0.1) 35px,
                  rgba(254, 254, 254, 0.1) 70px
                )`
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-display-lg mb-6">
                {dropConfig.mode === 'sold-out' ? 'DROP 002' : 'JOIN THE'}
                <br />
                <span className="text-bagel-tan">6-0 CLUB</span>
              </h2>
              <p className="font-mono text-sm sm:text-base mb-12 text-cream/70 max-w-xl mx-auto">
                {dropConfig.mode === 'sold-out'
                  ? 'Get early access to Drop 002. First to know, first to cop.'
                  : 'Get notified when the drop goes live. No spam, just drops.'}
              </p>
              <WaitlistForm dropNumber={dropConfig.mode === 'sold-out' ? '002' : '001'} />
            </div>
          </div>
        </section>
      )}

      {/* Brand Story Section */}
      <section className="py-20 sm:py-32 bg-cream">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <div className="font-mono text-xs uppercase tracking-wider bg-bagel-tan/20 text-true-black px-4 py-2 inline-block mb-6">
                The Manifesto
              </div>
              <h2 className="font-display text-display-md mb-8">
                LOSING 6-0
                <br />
                IS AN
                <br />
                <span className="text-bagel-tan">ART FORM</span>
              </h2>
              <div className="font-mono text-sm sm:text-base space-y-6 text-true-black/80 leading-relaxed">
                <p>
                  We&apos;re not here to win. We&apos;re here to show up, get absolutely demolished, and look good doing it.
                </p>
                <p>
                  Getting bageled isn&apos;t a failure—it&apos;s a lifestyle. A badge of honor. A perfect circle of defeat that keeps us coming back for more.
                </p>
                <p className="text-bagel-tan font-bold">
                  If you know, you know. 🥯
                </p>
              </div>
              <Link
                href="/about"
                className="inline-block mt-8 font-mono text-sm font-bold uppercase tracking-wider hover:text-bagel-tan transition-colors duration-300 border-b-2 border-true-black hover:border-bagel-tan"
              >
                Read Full Manifesto →
              </Link>
            </div>

            {/* Image Placeholder */}
            <div className="relative aspect-[4/5] bg-true-black/5 border-3 border-true-black overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-9xl text-true-black/10 mb-4">6-0</div>
                  <p className="font-mono text-xs text-true-black/40 uppercase tracking-wider">
                    Product Photo Here
                    <br />
                    <span className="text-[10px]">Lifestyle shot: Player on court with bagel tee</span>
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-bagel-tan/0 group-hover:bg-bagel-tan/10 transition-colors duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Scarcity Stats */}
      {dropConfig.mode !== 'sold-out' && (
        <section className="py-16 sm:py-20 bg-bagel-tan">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-display text-5xl sm:text-6xl lg:text-7xl mb-2 text-true-black">
                  5
                </div>
                <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-true-black/70">
                  SKUs Only
                </div>
              </div>
              <div>
                <div className="font-display text-5xl sm:text-6xl lg:text-7xl mb-2 text-true-black">
                  XXX
                </div>
                <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-true-black/70">
                  Total Units
                </div>
              </div>
              <div>
                <div className="font-display text-5xl sm:text-6xl lg:text-7xl mb-2 text-true-black">
                  0
                </div>
                <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-true-black/70">
                  Restocks Ever
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      {dropConfig.mode === 'live' && (
        <section className="py-20 sm:py-32 bg-true-black text-cream text-center">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-display-lg mb-8">
              ONCE THEY&apos;RE GONE,
              <br />
              <span className="text-bagel-tan">THEY&apos;RE GONE</span>
            </h2>
            <Link
              href="/shop"
              className="inline-block group"
            >
              <div className="border-3 border-cream hover:bg-cream px-12 py-6 transition-colors duration-300">
                <span className="font-display text-3xl sm:text-4xl group-hover:text-true-black transition-colors duration-300">
                  Shop Now
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
