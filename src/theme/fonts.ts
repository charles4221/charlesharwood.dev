import { Fira_Code, VT323 } from 'next/font/google';

export const FONT_FIRA_CODE = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-code',
});

export const FONT_VT_323 = VT323({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-vt323',
});
