import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navigation from '../components/Navigation';
import { ThemeProvider } from '../components/ThemeProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Password Generator',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className='min-h-full flex flex-row'>
        <ThemeProvider>
          <Navigation />
          <div className='flex flex-col w-[80%] h-screen px-7 py-10 bg-[var(--background)] text-[var(--text-primary)]'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
