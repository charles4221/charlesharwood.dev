'use client';

import { SliceZone } from '@prismicio/react';
import {
  SliceSimulator as SliceSimulatorComponent,
  SliceSimulatorSliceZoneProps,
} from '@slicemachine/adapter-next/simulator';

import { components } from '@/components/slices';

function renderSliceZone(props: SliceSimulatorSliceZoneProps) {
  return <SliceZone {...props} components={components} />;
}

export function SliceSimulator() {
  return <SliceSimulatorComponent sliceZone={renderSliceZone} />;
}
