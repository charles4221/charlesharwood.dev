import { Client } from 'node-mailjet';

export const INVALID_EMAIL_ERROR_CODE = 'mj-0013';

export const INVALID_ERROR_CODES = new Set([
  'mj-0003',
  'mj-0004',
  'mj-0005',
  'mj-0006',
  'mj-0007',
  'mj-0008',
  'mj-0012',
]);

export const mailjetClient = new Client({
  apiKey: process.env.EMAIL_API_PUBLIC_KEY,
  apiSecret: process.env.EMAIL_API_SECRET_KEY,
  config: {
    version: 'v3.1',
    output: 'json',
  },
});
