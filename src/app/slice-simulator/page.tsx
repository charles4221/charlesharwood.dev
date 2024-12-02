import { Metadata } from 'next';

import { SliceSimulator } from './slice-simulator';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SliceSimulatorPage() {
  return <SliceSimulator />;
}
