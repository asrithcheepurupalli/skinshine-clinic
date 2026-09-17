import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://skinshine.made-by-ac.com'),
  title: 'Skinshine Skin & Hair Clinic | Dr. Mettu Jyothsna, Visakhapatnam',
  description: 'Premier clinical dermatology, advanced USFDA laser therapies, GFC hair restoration, and medical aesthetics at VIP Towers, Siripuram, Visakhapatnam. Led by Dr. Mettu Jyothsna (MBBS, MD DVL, 18+ Years Experience).',
  keywords: [
    'Dermatologist in Visakhapatnam',
    'Best Skin Doctor Vizag',
    'Dr Mettu Jyothsna',
    'Skinshine Clinic Siripuram',
    'Skinshine Skin and Hair Clinic',
    'Laser Hair Removal Vizag',
    'Acne treatment Visakhapatnam',
    'Hair PRP GFC Vizag',
    'Melasma treatment Vizag',
    'Chemical Peels Vizag',
    'Skin specialist VIP Road'
  ],
  authors: [{ name: 'Dr. Mettu Jyothsna (MBBS, MD DVL)' }],
  creator: 'Dr. Mettu Jyothsna',
  publisher: 'Skinshine Skin and Hair Clinic',
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://skinshine.made-by-ac.com',
    siteName: 'Skinshine Skin and Hair Clinic',
    title: 'Skinshine Skin & Hair Clinic | Dr. Mettu Jyothsna (MD DVL)',
    description: '18+ years of clinical dermatology, USFDA laser therapies, and trichology at VIP Towers, Siripuram, Visakhapatnam. Book your consultation online.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Skinshine Skin & Hair Clinic - Dr. Mettu Jyothsna',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skinshine Skin & Hair Clinic | Dr. Mettu Jyothsna (MD DVL)',
    description: 'Hospital-grade clinical dermatology, USFDA lasers, and trichology in Visakhapatnam.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://skinshine.made-by-ac.com',
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
