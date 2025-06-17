import bundleAnalyzer from '@next/bundle-analyzer';
import { createClient as createPrismicClient } from '@prismicio/client';
import { type SentryBuildOptions, withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

import { repositoryName } from '@/prismic-config';
import { IS_DEV } from '@/utils/constants';

const nextConfig = async (): Promise<NextConfig> => {
  const client = createPrismicClient(repositoryName);

  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);

  return {
    reactStrictMode: true,
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales,
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: locales[0],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.prismic.io',
        },
      ],
    },
    redirects: async () => {
      return [
        {
          source: '/portfolio',
          destination: '/about',
          permanent: true,
        },
        {
          source: '/project/:slug',
          destination: '/about',
          permanent: true,
        },
      ];
    },
  };
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfigWithBundleAnalyzer = withBundleAnalyzer(nextConfig);

const sentryBuildOptions: SentryBuildOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'harwood-digital-services',
  project: 'charlesharwood',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Disable source map uploads when building locally
  sourcemaps: {
    disable: process.env.DISABLE_SOURCEMAP_UPLOAD === 'true',
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: !IS_DEV,

  // Optimizes bundle size by removing unnecessary code
  bundleSizeOptimizations: {
    excludeDebugStatements: !IS_DEV,
    excludeReplayIframe: true,
    excludeReplayShadowDom: true,
    excludeReplayWorker: true,
  },

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: false, // change to true if using Vercel Cron Jobs
};

const finalConfig = withSentryConfig(
  nextConfigWithBundleAnalyzer,
  sentryBuildOptions,
);

export default finalConfig;
