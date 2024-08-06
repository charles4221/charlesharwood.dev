'use client';

import { SliceZone } from '@prismicio/react';
import { SliceSimulator } from '@slicemachine/adapter-next/simulator';

import { components } from '@/components/slices';

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={(props) => <SliceZone {...props} components={components} />}
    />
  );
}
