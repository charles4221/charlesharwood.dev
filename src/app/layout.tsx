import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { PrismicPreview } from '@prismicio/next';
import clsx from 'clsx';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { repositoryName } from '@/prismic-config';
import { FONT_FIRA_CODE, FONT_VT_323 } from '@/theme/fonts';

config.autoAddCss = false;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(FONT_FIRA_CODE.variable, FONT_VT_323.variable)}>
      <body className="overflow-x-hidden antialiased dark:bg-slate-950 dark:text-white">
        <Header />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
