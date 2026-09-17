import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Skinshine Skin & Hair Clinic | Dr. Mettu Jyothsna, Visakhapatnam',
  description: 'Premier clinical dermatology, advanced USFDA laser therapies, trichology, and aesthetics in Siripuram, Visakhapatnam led by Dr. Mettu Jyothsna (MBBS, MD DVL).',
  icons: {
    icon: '/assets/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FAF9F6] text-stone-900 selection:bg-stone-200`}>
        {children}
      </body>
    </html>
  );
}
