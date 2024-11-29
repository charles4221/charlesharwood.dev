import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { PrismicPreview } from '@prismicio/next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import { Fira_Code, VT323 } from 'next/font/google';
import Script from 'next/script';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { repositoryName } from '@/prismic-config';

import { Providers } from './providers';

config.autoAddCss = false;

const FONT_FIRA_CODE = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-code',
});

const FONT_VT_323 = VT323({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-vt323',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(FONT_FIRA_CODE.variable, FONT_VT_323.variable)}>
      <body className="overflow-x-hidden antialiased text-slate-950 dark:bg-slate-950 dark:text-white">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
        <PrismicPreview repositoryName={repositoryName} />
        <Analytics />
        <SpeedInsights />
        <Script
          defer
          src="https://umami.charlesharwood.dev/script.js"
          data-website-id="fd44e4d7-5935-4ef6-b888-4bdf25990f4e"
        />
      </body>
    </html>
  );
}
