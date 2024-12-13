export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = process.env.NODE_ENV !== 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';

const PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const BASE_URL = PRODUCTION_URL
  ? `https://${PRODUCTION_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;

export const METADATA_BASE = new URL(BASE_URL);

export const PAGES_WITH_CUSTOM_ROUTE_HANDLERS = new Set([
  'home',
  'about',
  'contact',
]);
