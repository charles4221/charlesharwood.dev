import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { PrismicPreview } from '@prismicio/next';
import clsx from 'clsx';
import { Fira_Code, VT323 } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { repositoryName } from '@/prismic-config';

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
        <Header />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
