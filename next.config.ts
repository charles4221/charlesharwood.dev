import bundleAnalyzer from '@next/bundle-analyzer';
import { type SentryBuildOptions, withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

import { IS_DEV } from '@/utils/constants';

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.prismic.io',
      },
    ],
  },
  redirects: () =>
    new Promise((resolve) => {
      resolve([
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
      ]);
    }),
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
