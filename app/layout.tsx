import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'Bagel Bros | Drop 001',
  description: 'Premium streetwear for the 6-0 Club. Limited drops, no restocks. Getting bageled never looked this good.',
  keywords: ['streetwear', 'merch', 'limited edition', 'bagel', 'padel', 'tennis', 'drop culture'],
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo-icon.png',
  },
  openGraph: {
    title: 'Bagel Bros | Drop 001',
    description: 'Premium streetwear for the 6-0 Club. Limited drops, no restocks.',
    type: 'website',
    images: ['/images/logo-main.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0A0A0A',
              color: '#FEFEFE',
              fontFamily: 'Space Mono, monospace',
              border: '2px solid #0A0A0A',
            },
          }}
        />
      </body>
    </html>
  );
}
