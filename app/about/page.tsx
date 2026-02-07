export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-6xl mb-8 text-center">
        The Bagel Bros Manifesto
      </h1>

      <div className="prose prose-lg max-w-none space-y-6 text-lg">
        <p className="text-center text-xl text-bagel-tan font-display mb-12">
          Getting bageled is not a failure. It&apos;s a lifestyle.
        </p>

        <div className="bg-cream border-2 border-true-black/10 rounded-lg p-8 mb-8">
          <h2 className="font-display text-2xl mb-4">What is a bagel?</h2>
          <p className="text-true-black/80">
            In padel (and tennis), getting &quot;bageled&quot; means losing a set 6-0.
            It&apos;s the ultimate scoreline. The perfect circle of defeat.
            And somehow, it keeps happening to us.
          </p>
        </div>

        <h2 className="font-display text-3xl mt-12 mb-4">Our Story</h2>
        <p>
          We&apos;re not pros. We&apos;re not even that good. But we show up to the court,
          racket in hand, ready to get absolutely destroyed by people who actually know
          what they&apos;re doing.
        </p>

        <p>
          After the hundredth 6-0 loss, we realized something: if you can&apos;t beat them,
          at least look good losing. Hence, Bagel Bros was born.
        </p>

        <h2 className="font-display text-3xl mt-12 mb-4">The Mission</h2>
        <p>
          Create premium streetwear for people who embrace the bagel. No participation trophies.
          No &quot;good try&quot; platitudes. Just honest, high-quality merch that says:
          <span className="font-display text-bagel-tan"> I got bageled and I&apos;m still here.</span>
        </p>

        <div className="bg-bagel-tan/10 border-2 border-bagel-tan rounded-lg p-8 my-12">
          <h2 className="font-display text-2xl mb-4">The 6-0 Club Pledge</h2>
          <ul className="space-y-2 text-true-black/80">
            <li>✓ We show up even when we know we&apos;ll lose</li>
            <li>✓ We laugh at our unforced errors (after crying a little)</li>
            <li>✓ We wear our bagels with pride</li>
            <li>✓ We never quit, even when we probably should</li>
            <li>✓ We look damn good doing it</li>
          </ul>
        </div>

        <h2 className="font-display text-3xl mt-12 mb-4">Limited Drops. No Restocks.</h2>
        <p>
          Just like that perfect 6-0 scoreline, each drop is a once-in-a-lifetime event.
          When it&apos;s gone, it&apos;s gone forever. No mass production. No selling out to big box stores.
          Just small batches of premium gear for people who get it.
        </p>

        <div className="text-center mt-16 pt-8 border-t-2 border-true-black/10">
          <p className="font-display text-2xl mb-4">
            Welcome to the Club. 🥯
          </p>
          <p className="text-true-black/60">
            See you on the court (where we&apos;ll probably lose)
          </p>
        </div>
      </div>
    </div>
  );
}
