import type { Metadata } from 'next';
import { Inter, Archivo_Black } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bagel Bros | Drop 001',
  description: 'Premium streetwear for the 6-0 Club. Limited drops, no restocks.',
  keywords: ['streetwear', 'merch', 'limited edition', 'bagel', 'padel'],
  openGraph: {
    title: 'Bagel Bros | Drop 001',
    description: 'Premium streetwear for the 6-0 Club.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#0A0A0A',
              color: '#FEFEFE',
              fontFamily: 'var(--font-inter)',
            },
          }}
        />
      </body>
    </html>
  );
}
