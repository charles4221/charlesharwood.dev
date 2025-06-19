import { PrismicPreview } from '@prismicio/next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

import { repositoryName } from '@/prismic-config';

export function Tracking() {
  return (
    <>
      <PrismicPreview repositoryName={repositoryName} />
      <Analytics />
      <SpeedInsights />
      <Script
        defer
        src="https://analytics.charlesharwood.dev/script.js"
        data-website-id="fd44e4d7-5935-4ef6-b888-4bdf25990f4e"
      />
    </>
  );
}
