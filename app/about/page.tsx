import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      {/* Hero with Background Image */}
      <section className="py-20 sm:py-32 bg-true-black text-cream relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Padel court"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="font-display text-[30vw] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
            6-0 6-0 6-0
          </div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-mono text-xs uppercase tracking-wider bg-bagel-tan text-true-black px-4 py-2 inline-block mb-8">
            The Manifesto
          </div>
          <h1 className="font-display text-display-xl mb-8 max-w-5xl mx-auto">
            THE
            <br />
            BAGEL BROS
            <br />
            <span className="text-bagel-tan">MANIFESTO</span>
          </h1>
          <p className="font-mono text-lg sm:text-xl max-w-2xl mx-auto text-cream/80">
            For those who show up, get demolished, and come back with a smile
          </p>
        </div>
      </section>

      {/* What is a Bagel with Image */}
      <section className="py-20 sm:py-32 bg-bagel-tan">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-display-md mb-8 text-center">
              WHAT IS A BAGEL?
            </h2>
            <div className="border-brutal bg-cream p-8 sm:p-12 mb-8">
              <p className="font-mono text-base sm:text-lg leading-relaxed text-center">
                In padel (and tennis), getting &quot;bageled&quot; means losing a set 6-0.
                It&apos;s the ultimate scoreline. The perfect circle of defeat. A donut. A zero.
                And somehow, it keeps happening to us.
              </p>
            </div>
            {/* Scoreboard Image */}
            <div className="relative aspect-video border-3 border-true-black overflow-hidden">
              <Image
                src="/images/scoreboard.jpg"
                alt="Scoreboard showing 6-0"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 sm:py-32 bg-cream">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column */}
            <div>
              <h2 className="font-display text-display-md mb-12">
                OUR
                <br />
                STORY
              </h2>

              <div className="space-y-8 font-mono text-sm sm:text-base leading-relaxed">
                <p>
                  We&apos;re not pros. We&apos;re not even that good. But we show up to the court,
                  racket in hand, ready to get absolutely destroyed by people who actually know
                  what they&apos;re doing.
                </p>

                <p>
                  After the hundredth 6-0 loss, we realized something profound: getting bageled
                  isn&apos;t about winning or losing. It&apos;s about embracing the absurdity.
                  The inevitability. The pure, unadulterated joy of showing up anyway.
                </p>

                <p className="text-bagel-tan font-bold">
                  If you can&apos;t beat them, at least look good losing.
                </p>
              </div>

              {/* Gallery Row */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="relative aspect-square border-3 border-true-black overflow-hidden">
                  <Image
                    src="/images/story-gallery-1.jpg"
                    alt="Players on court"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square border-3 border-true-black overflow-hidden">
                  <Image
                    src="/images/story-gallery-2.jpg"
                    alt="Padel action"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              {/* Stat Block 1 */}
              <div className="border-brutal bg-true-black text-cream p-8">
                <div className="font-display text-6xl mb-2">100%</div>
                <div className="font-mono text-sm uppercase tracking-wider text-cream/60">
                  Acceptance Rate of Defeat
                </div>
              </div>

              {/* Large Image */}
              <div className="relative aspect-[4/5] border-brutal overflow-hidden">
                <Image
                  src="/images/about-lifestyle.jpg"
                  alt="Player lifestyle"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Stat Block 2 */}
              <div className="border-brutal bg-bagel-tan p-8">
                <div className="font-display text-6xl mb-2">0</div>
                <div className="font-mono text-sm uppercase tracking-wider text-true-black/60">
                  Wins Expected (And We&apos;re Fine With That)
                </div>
              </div>

              {/* Stat Block 3 */}
              <div className="border-brutal bg-cream border-true-black p-8">
                <div className="font-display text-6xl mb-2">6-0</div>
                <div className="font-mono text-sm uppercase tracking-wider text-true-black/60">
                  The Score That Started It All
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mission with Background */}
      <section className="py-20 sm:py-32 bg-true-black text-cream relative">
        <div className="absolute inset-0">
          <Image
            src="/images/lifestyle-section.jpg"
            alt="Court lifestyle"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-display-lg mb-16 text-center">
            THE
            <br />
            <span className="text-bagel-tan">MISSION</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-8 font-mono text-base sm:text-lg leading-relaxed text-cream/80">
            <p className="text-center text-xl sm:text-2xl text-cream">
              Create premium streetwear for people who embrace the bagel.
            </p>

            <p>
              No participation trophies. No &quot;good try&quot; platitudes. Just honest,
              high-quality merch that says: <span className="text-bagel-tan font-bold">I got bageled
              and I&apos;m still here.</span>
            </p>

            <p>
              We make clothes for the eternal optimists. The ones who book another court time
              before the current match even ends. The ones who know deep down they&apos;re going
              to lose 6-0 again but show up anyway because it&apos;s about the friends we get
              destroyed with along the way.
            </p>
          </div>
        </div>
      </section>

      {/* The Pledge */}
      <section className="py-20 sm:py-32 bg-bagel-tan">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-display-md mb-12 text-center">
              THE 6-0 CLUB PLEDGE
            </h2>

            <div className="border-brutal bg-cream p-8 sm:p-12">
              <ul className="space-y-6 font-mono text-sm sm:text-base">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 border-3 border-true-black bg-bagel-tan flex-shrink-0 flex items-center justify-center font-display text-xl">
                    ✓
                  </div>
                  <span>We show up even when we know we&apos;ll lose</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 border-3 border-true-black bg-bagel-tan flex-shrink-0 flex items-center justify-center font-display text-xl">
                    ✓
                  </div>
                  <span>We laugh at our unforced errors (after crying a little)</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 border-3 border-true-black bg-bagel-tan flex-shrink-0 flex items-center justify-center font-display text-xl">
                    ✓
                  </div>
                  <span>We wear our bagels with pride</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 border-3 border-true-black bg-bagel-tan flex-shrink-0 flex items-center justify-center font-display text-xl">
                    ✓
                  </div>
                  <span>We never quit, even when we probably should</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 border-3 border-true-black bg-bagel-tan flex-shrink-0 flex items-center justify-center font-display text-xl">
                    ✓
                  </div>
                  <span className="font-bold">We look damn good doing it</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Community Gallery */}
      <section className="py-20 sm:py-32 bg-cream">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-display-md mb-12 text-center">
            THE
            <br />
            <span className="text-bagel-tan">TEAM</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/images/team-1.jpg',
              '/images/team-2.jpg',
              '/images/team-3.jpg',
              '/images/team-4.jpg',
            ].map((img, i) => (
              <div key={i} className="relative aspect-[3/4] border-3 border-true-black overflow-hidden group">
                <Image
                  src={img}
                  alt={`Team member ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-bagel-tan/0 group-hover:bg-bagel-tan/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Drops */}
      <section className="py-20 sm:py-32 bg-true-black text-cream text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-display-lg mb-8">
            LIMITED DROPS.
            <br />
            <span className="text-bagel-tan">NO RESTOCKS.</span>
          </h2>

          <p className="font-mono text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed text-cream/80">
            Just like that perfect 6-0 scoreline, each drop is a once-in-a-lifetime event.
            When it&apos;s gone, it&apos;s gone forever. No mass production. No selling out to big box stores.
            Just small batches of premium gear for people who get it.
          </p>

          <div className="inline-block border-brutal bg-bagel-tan text-true-black px-12 py-6">
            <p className="font-display text-3xl sm:text-4xl">
              IF YOU KNOW,
              <br />
              YOU KNOW. 🥯
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32 bg-bagel-tan text-true-black text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-display-lg mb-6">
            WELCOME TO
            <br />
            <span className="text-true-black">THE CLUB</span>
          </h2>
          <p className="font-mono text-sm text-true-black/60">
            See you on the court (where we&apos;ll probably lose)
          </p>
        </div>
      </section>
    </div>
  );
}
