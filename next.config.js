const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const prismic = require('@prismicio/client');

const sm = require('./slicemachine.config.json');

/** @type {() => Promise<import('next').NextConfig>} */
const nextConfig = async () => {
  const client = prismic.createClient(sm.repositoryName);

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
  };
};

module.exports = withBundleAnalyzer(nextConfig);
