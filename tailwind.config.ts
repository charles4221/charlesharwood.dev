// const {colors} = require('./src/theme/colors');

import pluginAspectRatio from '@tailwindcss/aspect-ratio';
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/theme/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // colors: {
    //   ...colors,
    //   primary: (theme) => theme("colors.cyan"),
    //   secondary: (theme) => theme("colors.green"),

    // },
    fontFamily: {
      sans: 'var(--font-fira-code), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      headings:
        'var(--font-vt323), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    extend: {},
  },
  plugins: [pluginAspectRatio],
} satisfies Config;
