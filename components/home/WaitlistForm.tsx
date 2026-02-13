'use client';

import { useState } from 'react';
import { toast } from '@/lib/utils/toast-config';

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
      toast.error('Enter your email');
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
        toast.success("You're in the 6-0 Club! 🥯");
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to join waitlist');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="border-brutal bg-bagel-tan p-8 sm:p-12 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="font-display text-5xl sm:text-6xl mb-4 text-true-black">
            YOU&apos;RE IN
          </div>
          <p className="font-mono text-sm text-true-black/80">
            Welcome to the 6-0 Club, Drop {dropNumber}
            <br />
            We&apos;ll email you when it&apos;s go time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-6 py-5 border-3 border-cream bg-cream/10 text-cream placeholder:text-cream/40 font-mono text-sm focus:outline-none focus:border-bagel-tan transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 sm:px-12 py-5 border-brutal border-brutal-hover bg-bagel-tan text-true-black font-mono text-sm font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? 'Joining...' : 'Join Waitlist'}
        </button>
      </div>
      <p className="font-mono text-xs text-cream/40 text-center mt-4">
        No spam. Just drops. Unsubscribe anytime.
      </p>
    </form>
  );
}
