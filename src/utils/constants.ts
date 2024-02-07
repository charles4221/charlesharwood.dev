import type { Metadata } from 'next';

export const IS_DEV = process.env.NODE_ENV !== 'production';

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  `http://localhost:${process.env.PORT || 3000}`;

export const METADATA_BASE: Metadata['metadataBase'] = new URL(BASE_URL);

export const PAGES_WITH_CUSTOM_ROUTE_HANDLERS = new Set([
  'home',
  'about',
  'contact',
]);
