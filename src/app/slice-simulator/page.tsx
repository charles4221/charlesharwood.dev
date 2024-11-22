'use client';

import { SliceZone } from '@prismicio/react';
import {
  SliceSimulator,
  SliceSimulatorSliceZoneProps,
} from '@slicemachine/adapter-next/simulator';

import { components } from '@/components/slices';

function renderSliceZone(props: SliceSimulatorSliceZoneProps) {
  return <SliceZone {...props} components={components} />;
}

export default function SliceSimulatorPage() {
  return <SliceSimulator sliceZone={renderSliceZone} />;
}
