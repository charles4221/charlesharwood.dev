import type { Metadata } from 'next';

export const METADATA_BASE: Metadata['metadataBase'] = new URL(
  `http://localhost:${process.env.PORT || 3000}`,
);
