'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface WaitlistFormProps {
  dropNumber?: string;
}

export default function WaitlistForm({ dropNumber = '001' }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, dropNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        toast.success("You're officially in the 6-0 Club! 🥯");
      } else {
        toast.error(data.error || 'Something went wrong. Try again.');
      }
    } catch (error) {
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-bagel-tan/10 border-2 border-bagel-tan rounded-lg p-8 text-center">
        <h3 className="font-display text-2xl sm:text-3xl mb-4">
          Welcome to the Club! 🥯
        </h3>
        <p className="text-lg mb-2">
          You&apos;re on the list for Drop {dropNumber}.
        </p>
        <p className="text-sm text-true-black/70">
          We&apos;ll email you when it&apos;s go time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-6 py-4 border-2 border-true-black rounded-lg focus:outline-none focus:ring-2 focus:ring-bagel-tan focus:border-transparent text-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-4 bg-true-black text-true-white font-display text-lg rounded-lg hover:bg-bagel-tan hover:text-true-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? 'Joining...' : 'Join Waitlist'}
        </button>
      </div>
      <p className="text-xs text-true-black/50 text-center mt-3">
        No spam. Just drops. Unsubscribe anytime.
      </p>
    </form>
  );
}
